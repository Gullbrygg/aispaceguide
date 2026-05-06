import { t, SenderError } from "spacetimedb/server";

import spacetimedb from "./schemas";
import { ChatMessage, ChatSession } from "./schemas";

export const init = spacetimedb.init((_ctx) => {
  // Called when the module is initially published
  _ctx.db.person.insert({ name: "hehee" });
});

export const onConnect = spacetimedb.clientConnected((ctx) => {
  const jwt = ctx.senderAuth.jwt;
  if (jwt == null) {
    throw new SenderError("Unauthorized: JWT is required to connect");
  }
  console.log(jwt);
  // Restrict to your specific Clerk instances (dev + prod) and SpacetimeDB
  const allowedIssuers = [
    "https://active-mouse-40.clerk.accounts.dev", // Clerk dev
    "https://clerk.gullbrygg.com",                // Clerk prod
    "https://auth.spacetimedb.com",
  ];
  if (!allowedIssuers.includes(jwt.issuer)) {
    throw new SenderError(`Unauthorized: unexpected issuer ${jwt.issuer}`);
  }

  // Check audience — ensures this token was minted FOR your app, not another
  // Clerk's default session token audience is your Frontend API URL
  const allowedAudiences = [
    "https://active-mouse-40.clerk.accounts.dev",
    "https://clerk.gullbrygg.com",
  ];
  const audiences = jwt.audience ?? [];
  if (!audiences.some((a) => allowedAudiences.includes(a))) {
    console.log("AAAAAAAAAAA ======= Unauthorized: invalid audience: "+jwt.audience)
  //   throw new SenderError(`Unauthorized: invalid audience ` + jwt.audience);
  }

  // Upsert user row — insert only on first connect
  const payload = jwt.fullPayload;

  // Helper to safely extract a string claim
  function getClaim(payload: Record<string, unknown>, key: string): string | undefined {
    const val = payload[key];
    if (typeof val === "string") return val;
    return undefined;
  }

  const existing = ctx.db.user.id.find(ctx.sender);

  if (!existing) {
    ctx.db.user.insert({
      id: ctx.sender,
      clerkId: jwt.subject,
      name: getClaim(payload, "fullname") ?? "",
      email: getClaim(payload, "email") ?? "",
      createdAt: ctx.timestamp,
      role: undefined
    });
  } else if (!existing.name) {
    ctx.db.user.id.update(existing);
  }
});

export const onDisconnect = spacetimedb.clientDisconnected((_ctx) => {
  // Called every time a client disconnects
});

function getCurrentUser(ctx: any) {
  const user = ctx.db.user.id.find(ctx.sender);
  if (!user) {
    throw new SenderError('User not found. Reconnect and try again.');
  }
  return user;
}

function requireRole(ctx: any, role: 'teacher' | 'student') {
  const user = getCurrentUser(ctx);
  if (user.role !== role) {
    throw new SenderError(`Only ${role}s can perform this action`);
  }
  return user;
}

function ensureStudentEnrolled(ctx: any, courseId: bigint, studentId: any) {
  for (const enrollment of ctx.db.course_enrollment.course_enrollment_student_id.filter(studentId)) {
    if (enrollment.courseId === courseId) {
      return enrollment;
    }
  }

  throw new SenderError('You are not enrolled in this course');
}

function getCourseAndRequireTeacher(ctx: any, courseId: bigint) {
  const course = ctx.db.course.id.find(courseId);
  if (!course) {
    throw new SenderError('Course not found');
  }

  if (course.teacherId.toHexString() !== ctx.sender.toHexString()) {
    throw new SenderError('Only the course teacher can perform this action');
  }

  return course;
}

export const add = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
  ctx.db.person.insert({ name });
});

export const set_user_profile = spacetimedb.reducer({ name: t.string() }, (ctx, { name }) => {
  const existing = ctx.db.user.id.find(ctx.sender);
  if (!existing) throw new SenderError("User not found");
  ctx.db.user.id.update({ ...existing, name });
});

export const set_user_role = spacetimedb.reducer({ role: t.string() }, (ctx, { role }) => {
  const existing = getCurrentUser(ctx);
  const normalizedRole = role.trim().toLowerCase();

  if (normalizedRole !== 'teacher' && normalizedRole !== 'student') {
    throw new SenderError('Role must be teacher or student');
  }

  ctx.db.user.id.update({ ...existing, role: normalizedRole });
});

export const create_course = spacetimedb.reducer(
  { title: t.string(), description: t.string().optional() },
  (ctx, { title, description }) => {
    requireRole(ctx, 'teacher');
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      throw new SenderError('Course title is required');
    }

    ctx.db.course.insert({
      id: 0n,
      teacherId: ctx.sender,
      title: trimmedTitle.slice(0, 160),
      description: description?.trim() || undefined,
      createdAt: ctx.timestamp,
    });
  }
);

export const create_course_task = spacetimedb.reducer(
  {
    courseId: t.u64(),
    title: t.string(),
    description: t.string().optional(),
    points: t.u64().optional(),
    dueAtMicros: t.u64().optional(),
  },
  (ctx, { courseId, title, description, points, dueAtMicros }) => {
    requireRole(ctx, 'teacher');
    getCourseAndRequireTeacher(ctx, courseId);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      throw new SenderError('Task title is required');
    }

    ctx.db.course_task.insert({
      id: 0n,
      courseId,
      title: trimmedTitle.slice(0, 200),
      description: description?.trim() || undefined,
      points: points && points > 0n ? points : 100n,
      dueAtMicros,
      createdBy: ctx.sender,
      createdAt: ctx.timestamp,
    });
  }
);

export const join_course = spacetimedb.reducer({ courseId: t.u64() }, (ctx, { courseId }) => {
  requireRole(ctx, 'student');

  const course = ctx.db.course.id.find(courseId);
  if (!course) {
    throw new SenderError('Course not found');
  }

  for (const enrollment of ctx.db.course_enrollment.course_enrollment_student_id.filter(ctx.sender)) {
    if (enrollment.courseId === courseId) {
      return;
    }
  }

  ctx.db.course_enrollment.insert({
    id: 0n,
    courseId,
    studentId: ctx.sender,
    joinedAt: ctx.timestamp,
  });
});

function getTaskAndRequireCourseMatch(ctx: any, taskId: bigint, courseId: bigint) {
  const task = ctx.db.course_task.id.find(taskId);
  if (!task) {
    throw new SenderError('Task not found');
  }

  if (task.courseId !== courseId) {
    throw new SenderError('Task does not belong to this course');
  }

  return task;
}

function ensureStudentNotAlreadyInTaskGroup(ctx: any, taskId: bigint, studentId: any) {
  for (const membership of ctx.db.task_group_member.task_group_member_student_id.filter(studentId)) {
    const group = ctx.db.task_group.id.find(membership.groupId);
    if (group && group.taskId === taskId) {
      throw new SenderError('You are already in a group for this task');
    }
  }
}

function cleanupTaskGroupIfEmpty(ctx: any, groupId: bigint) {
  for (const _member of ctx.db.task_group_member.task_group_member_group_id.filter(groupId)) {
    return;
  }

  for (const submission of ctx.db.task_submission.task_submission_group_id.filter(groupId)) {
    for (const grade of ctx.db.task_grade.task_grade_submission_id.filter(submission.id)) {
      ctx.db.task_grade.id.delete(grade.id);
    }
    ctx.db.task_submission.id.delete(submission.id);
  }

  ctx.db.task_group.id.delete(groupId);
}

export const create_task_group = spacetimedb.reducer(
  { courseId: t.u64(), taskId: t.u64(), name: t.string() },
  (ctx, { courseId, taskId, name }) => {
    requireRole(ctx, 'student');
    ensureStudentEnrolled(ctx, courseId, ctx.sender);
    getTaskAndRequireCourseMatch(ctx, taskId, courseId);
    ensureStudentNotAlreadyInTaskGroup(ctx, taskId, ctx.sender);

    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new SenderError('Group name is required');
    }

    const group = ctx.db.task_group.insert({
      id: 0n,
      courseId,
      taskId,
      name: trimmedName.slice(0, 160),
      createdBy: ctx.sender,
      createdAt: ctx.timestamp,
    });

    ctx.db.task_group_member.insert({
      id: 0n,
      groupId: group.id,
      studentId: ctx.sender,
      joinedAt: ctx.timestamp,
    });
  }
);

export const join_task_group = spacetimedb.reducer({ groupId: t.u64() }, (ctx, { groupId }) => {
  requireRole(ctx, 'student');

  const group = ctx.db.task_group.id.find(groupId);
  if (!group) {
    throw new SenderError('Group not found');
  }

  ensureStudentEnrolled(ctx, group.courseId, ctx.sender);
  ensureStudentNotAlreadyInTaskGroup(ctx, group.taskId, ctx.sender);

  for (const membership of ctx.db.task_group_member.task_group_member_group_id.filter(groupId)) {
    if (membership.studentId.toHexString() === ctx.sender.toHexString()) {
      return;
    }
  }

  ctx.db.task_group_member.insert({
    id: 0n,
    groupId,
    studentId: ctx.sender,
    joinedAt: ctx.timestamp,
  });
});

export const leave_task_group = spacetimedb.reducer({ groupId: t.u64() }, (ctx, { groupId }) => {
  requireRole(ctx, 'student');

  const group = ctx.db.task_group.id.find(groupId);
  if (!group) {
    throw new SenderError('Group not found');
  }

  let membership = undefined;
  for (const row of ctx.db.task_group_member.task_group_member_group_id.filter(groupId)) {
    if (row.studentId.toHexString() === ctx.sender.toHexString()) {
      membership = row;
      break;
    }
  }

  if (!membership) {
    throw new SenderError('You are not a member of this group');
  }

  ctx.db.task_group_member.id.delete(membership.id);
  cleanupTaskGroupIfEmpty(ctx, groupId);
});

export const leave_course = spacetimedb.reducer({ courseId: t.u64() }, (ctx, { courseId }) => {
  requireRole(ctx, 'student');

  const course = ctx.db.course.id.find(courseId);
  if (!course) {
    throw new SenderError('Course not found');
  }

  let enrollment = undefined;
  for (const row of ctx.db.course_enrollment.course_enrollment_student_id.filter(ctx.sender)) {
    if (row.courseId === courseId) {
      enrollment = row;
      break;
    }
  }

  if (!enrollment) {
    throw new SenderError('You are not enrolled in this course');
  }

  const groupsToCleanup: bigint[] = [];
  for (const membership of ctx.db.task_group_member.task_group_member_student_id.filter(ctx.sender)) {
    const group = ctx.db.task_group.id.find(membership.groupId);
    if (group && group.courseId === courseId) {
      groupsToCleanup.push(group.id);
      ctx.db.task_group_member.id.delete(membership.id);
    }
  }

  for (const groupId of groupsToCleanup) {
    cleanupTaskGroupIfEmpty(ctx, groupId);
  }

  ctx.db.course_enrollment.id.delete(enrollment.id);
});

export const submit_task_group_work = spacetimedb.reducer(
  { taskId: t.u64(), groupId: t.u64(), content: t.string() },
  (ctx, { taskId, groupId, content }) => {
    requireRole(ctx, 'student');

    const task = ctx.db.course_task.id.find(taskId);
    if (!task) {
      throw new SenderError('Task not found');
    }

    const group = ctx.db.task_group.id.find(groupId);
    if (!group || group.taskId !== taskId) {
      throw new SenderError('Group does not match this task');
    }

    let isMember = false;
    for (const membership of ctx.db.task_group_member.task_group_member_group_id.filter(groupId)) {
      if (membership.studentId.toHexString() === ctx.sender.toHexString()) {
        isMember = true;
        break;
      }
    }

    if (!isMember) {
      throw new SenderError('You are not a member of this group');
    }

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      throw new SenderError('Submission content is required');
    }

    let existingSubmission = undefined;
    for (const submission of ctx.db.task_submission.task_submission_group_id.filter(groupId)) {
      if (submission.taskId === taskId) {
        existingSubmission = submission;
        break;
      }
    }

    if (existingSubmission) {
      ctx.db.task_submission.id.update({
        ...existingSubmission,
        content: trimmedContent,
        submittedBy: ctx.sender,
        submittedAt: ctx.timestamp,
        status: 'submitted',
      });
      return;
    }

    ctx.db.task_submission.insert({
      id: 0n,
      taskId,
      groupId,
      submittedBy: ctx.sender,
      content: trimmedContent,
      submittedAt: ctx.timestamp,
      status: 'submitted',
    });
  }
);

export const grade_task_submission = spacetimedb.reducer(
  { submissionId: t.u64(), score: t.u64(), feedback: t.string() },
  (ctx, { submissionId, score, feedback }) => {
    requireRole(ctx, 'teacher');

    const submission = ctx.db.task_submission.id.find(submissionId);
    if (!submission) {
      throw new SenderError('Submission not found');
    }

    const task = ctx.db.course_task.id.find(submission.taskId);
    if (!task) {
      throw new SenderError('Task not found');
    }

    getCourseAndRequireTeacher(ctx, task.courseId);

    const trimmedFeedback = feedback.trim();
    if (!trimmedFeedback) {
      throw new SenderError('Feedback is required');
    }

    let existingGrade = undefined;
    for (const grade of ctx.db.task_grade.task_grade_submission_id.filter(submissionId)) {
      existingGrade = grade;
      break;
    }

    if (existingGrade) {
      ctx.db.task_grade.id.update({
        ...existingGrade,
        score,
        feedback: trimmedFeedback,
        gradedBy: ctx.sender,
        gradedAt: ctx.timestamp,
      });
    } else {
      ctx.db.task_grade.insert({
        id: 0n,
        submissionId,
        gradedBy: ctx.sender,
        score,
        feedback: trimmedFeedback,
        gradedAt: ctx.timestamp,
      });
    }
  }
);

export const sayHello = spacetimedb.reducer((ctx) => {
  for (const person of ctx.db.person.iter()) {
    console.info(`Hello, ${person.name}!`);
  }
  console.info("Hello, World!");
});

export const create_chat_session = spacetimedb.reducer(
  { title: t.string().optional(), clientRequestId: t.string().optional() },
  (ctx, { title, clientRequestId }) => {
    for (const existingSession of ctx.db.chat_session.chat_session_owner_id.filter(ctx.sender)) {
      let hasMessages = false;
      for (const _message of ctx.db.chat_message.chat_message_session_id.filter(existingSession.id)) {
        hasMessages = true;
        break;
      }

      if (!hasMessages) {
        throw new SenderError('You already have an empty chat. Use it or remove it before creating a new one.');
      }
    }

    const now = ctx.timestamp;
    const trimmedTitle = title?.trim();

    ctx.db.chat_session.insert({
      id: 0n,
      ownerId: ctx.sender,
      clientRequestId,
      title: trimmedTitle && trimmedTitle.length > 0 ? trimmedTitle.slice(0, 120) : 'Ny chat',
      createdAt: now,
      updatedAt: now,
    });
  }
);

export const invite_user_to_chat = spacetimedb.reducer(
  { sessionId: t.u64(), invitedClerkId: t.string() },
  (ctx, { sessionId, invitedClerkId }) => {
    const _unused = invitedClerkId;
    throw new SenderError('User-lookup invites are disabled for privacy. Use invite codes instead.');
  }
);

export const create_chat_invite = spacetimedb.reducer(
  { sessionId: t.u64(), code: t.string() },
  (ctx, { sessionId, code }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session || session.ownerId.toHexString() !== ctx.sender.toHexString()) {
      throw new SenderError('Only the session owner can create invite codes');
    }

    const normalizedCode = code.trim();
    if (normalizedCode.length < 16) {
      throw new SenderError('Invite code must be at least 16 characters');
    }

    for (const existing of ctx.db.chat_session_invite.chat_session_invite_code.filter(normalizedCode)) {
      if (!existing.usedBy) {
        throw new SenderError('Invite code already exists. Generate a new one.');
      }
    }

    ctx.db.chat_session_invite.insert({
      id: 0n,
      sessionId,
      code: normalizedCode,
      createdBy: ctx.sender,
      createdAt: ctx.timestamp,
      usedBy: undefined,
      usedAt: undefined,
    });
  }
);

export const join_chat_with_invite_code = spacetimedb.reducer(
  { code: t.string() },
  (ctx, { code }) => {
    const normalizedCode = code.trim();
    if (!normalizedCode) {
      throw new SenderError('Invite code is required');
    }

    let invite = undefined;
    for (const row of ctx.db.chat_session_invite.chat_session_invite_code.filter(normalizedCode)) {
      invite = row;
      break;
    }

    if (!invite) {
      throw new SenderError('Invite code not found');
    }

    if (invite.usedBy) {
      throw new SenderError('Invite code has already been used');
    }

    const session = ctx.db.chat_session.id.find(invite.sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    if (session.ownerId.toHexString() === ctx.sender.toHexString()) {
      throw new SenderError('You are already a participant');
    }

    for (const member of ctx.db.chat_session_member.chat_session_member_session_id.filter(invite.sessionId)) {
      if (member.userId.toHexString() === ctx.sender.toHexString()) {
        throw new SenderError('You are already a participant');
      }
    }

    ctx.db.chat_session_member.insert({
      id: 0n,
      sessionId: invite.sessionId,
      userId: ctx.sender,
      invitedBy: invite.createdBy,
      invitedAt: ctx.timestamp,
    });

    ctx.db.chat_session_invite.id.update({
      ...invite,
      usedBy: ctx.sender,
      usedAt: ctx.timestamp,
    });
  }
);

export const save_chat_message = spacetimedb.reducer(
  {
    sessionId: t.u64(),
    role: t.string(),
    content: t.string(),
    inputTokens: t.u64().optional(),
    outputTokens: t.u64().optional(),
  },
  (ctx, { sessionId, role, content, inputTokens, outputTokens }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    const isOwner = session.ownerId.toHexString() === ctx.sender.toHexString();
    let isMember = false;
    if (!isOwner) {
      for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
        if (member.sessionId === sessionId) {
          isMember = true;
          break;
        }
      }
    }

    if (!isOwner && !isMember) {
      throw new SenderError('You do not have access to this chat session');
    }

    const normalizedRole = role.trim().toLowerCase();
    if (normalizedRole !== 'user' && normalizedRole !== 'assistant' && normalizedRole !== 'system') {
      throw new SenderError('Invalid role');
    }

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      throw new SenderError('Message content is required');
    }

    ctx.db.chat_message.insert({
      id: 0n,
      sessionId,
      ownerId: ctx.sender,
      role: normalizedRole,
      content: trimmedContent,
      inputTokens,
      outputTokens,
      createdAt: ctx.timestamp,
    });

    ctx.db.chat_session.id.update({
      ...session,
      updatedAt: ctx.timestamp,
      title:
        (session.title === 'New chat' || session.title === 'Ny chat') && normalizedRole === 'user'
          ? trimmedContent.slice(0, 72)
          : session.title,
    });
  }
);

export const remove_chat_session = spacetimedb.reducer(
  { sessionId: t.u64() },
  (ctx, { sessionId }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    if (session.ownerId.toHexString() !== ctx.sender.toHexString()) {
      throw new SenderError('Only the session owner can remove this chat');
    }

    for (const message of ctx.db.chat_message.chat_message_session_id.filter(sessionId)) {
      ctx.db.chat_message.id.delete(message.id);
    }

    for (const member of ctx.db.chat_session_member.chat_session_member_session_id.filter(sessionId)) {
      ctx.db.chat_session_member.id.delete(member.id);
    }

    for (const invite of ctx.db.chat_session_invite.chat_session_invite_session_id.filter(sessionId)) {
      ctx.db.chat_session_invite.id.delete(invite.id);
    }

    ctx.db.chat_session.id.delete(sessionId);
  }
);

export const leave_chat_session = spacetimedb.reducer(
  { sessionId: t.u64() },
  (ctx, { sessionId }) => {
    const session = ctx.db.chat_session.id.find(sessionId);
    if (!session) {
      throw new SenderError('Chat session not found');
    }

    if (session.ownerId.toHexString() === ctx.sender.toHexString()) {
      throw new SenderError('Session owner cannot leave. Remove the chat instead.');
    }

    let membership = undefined;
    for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
      if (member.sessionId === sessionId) {
        membership = member;
        break;
      }
    }

    if (!membership) {
      throw new SenderError('You are not a member of this chat session');
    }

    ctx.db.chat_session_member.id.delete(membership.id);
  }
);

export const get_accessible_chat_sessions = spacetimedb.procedure(
  t.array(ChatSession.rowType),
  (ctx) =>
    ctx.withTx((tx) => {
      const sessions = [...tx.db.chat_session.chat_session_owner_id.filter(tx.sender)];
      const seenSessionIds = new Set(sessions.map((session) => session.id.toString()));

      for (const member of tx.db.chat_session_member.chat_session_member_user_id.filter(tx.sender)) {
        const session = tx.db.chat_session.id.find(member.sessionId);
        if (session && !seenSessionIds.has(session.id.toString())) {
          seenSessionIds.add(session.id.toString());
          sessions.push(session);
        }
      }

      sessions.sort((a, b) => Number(b.updatedAt.microsSinceUnixEpoch - a.updatedAt.microsSinceUnixEpoch));
      return sessions;
    })
);

export const get_accessible_chat_messages = spacetimedb.procedure(
  { sessionId: t.u64() },
  t.array(ChatMessage.rowType),
  (ctx, { sessionId }) =>
    ctx.withTx((tx) => {
      const session = tx.db.chat_session.id.find(sessionId);
      if (!session) {
        return [];
      }

      const isOwner = session.ownerId.toHexString() === tx.sender.toHexString();
      let isMember = false;

      if (!isOwner) {
        for (const member of tx.db.chat_session_member.chat_session_member_user_id.filter(tx.sender)) {
          if (member.sessionId === sessionId) {
            isMember = true;
            break;
          }
        }
      }

      if (!isOwner && !isMember) {
        return [];
      }

      const messages = [...tx.db.chat_message.chat_message_session_id.filter(sessionId)];
      messages.sort((a, b) => Number(a.createdAt.microsSinceUnixEpoch - b.createdAt.microsSinceUnixEpoch));
      return messages;
    })
);

export default spacetimedb;
