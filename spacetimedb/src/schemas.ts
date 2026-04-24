import { schema, table, t } from 'spacetimedb/server';

export const ChatSession = table(
  {
    indexes: [
      { accessor: 'chat_session_client_request_id', algorithm: 'btree', columns: ['clientRequestId'] },
      { accessor: 'chat_session_owner_id', algorithm: 'btree', columns: ['ownerId'] },
      { accessor: 'chat_session_updated_at', algorithm: 'btree', columns: ['updatedAt'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    ownerId: t.identity(),
    clientRequestId: t.string().optional(),
    title: t.string(),
    createdAt: t.timestamp(),
    updatedAt: t.timestamp()
  }
);

export const ChatMessage = table(
  {
    indexes: [
      { accessor: 'chat_message_owner_id', algorithm: 'btree', columns: ['ownerId'] },
      { accessor: 'chat_message_session_id', algorithm: 'btree', columns: ['sessionId'] },
      { accessor: 'chat_message_created_at', algorithm: 'btree', columns: ['createdAt'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    ownerId: t.identity(),
    role: t.string(),
    content: t.string(),
    inputTokens: t.u64().optional(),
    outputTokens: t.u64().optional(),
    createdAt: t.timestamp()
  }
);

export const ChatSessionMember = table(
  {
    indexes: [
      { accessor: 'chat_session_member_session_id', algorithm: 'btree', columns: ['sessionId'] },
      { accessor: 'chat_session_member_user_id', algorithm: 'btree', columns: ['userId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    userId: t.identity(),
    invitedBy: t.identity(),
    invitedAt: t.timestamp()
  }
);

export const ChatSessionInvite = table(
  {
    indexes: [
      { accessor: 'chat_session_invite_code', algorithm: 'btree', columns: ['code'] },
      { accessor: 'chat_session_invite_session_id', algorithm: 'btree', columns: ['sessionId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    sessionId: t.u64(),
    code: t.string(),
    createdBy: t.identity(),
    createdAt: t.timestamp(),
    usedBy: t.identity().optional(),
    usedAt: t.timestamp().optional()
  }
);

export const User = table(
  {
    public: true,
    indexes: [{ accessor: 'user_clerk_id', algorithm: 'btree', columns: ['clerkId'] }]
  },
  {
    id: t.identity().primaryKey(),
    clerkId: t.string(),
    name: t.string().optional(),
    email: t.string().optional(),
    role: t.string().optional(),
    createdAt: t.timestamp(),
  }
);

export const Course = table(
  {
    public: true,
    indexes: [
      { accessor: 'course_teacher_id', algorithm: 'btree', columns: ['teacherId'] },
      { accessor: 'course_created_at', algorithm: 'btree', columns: ['createdAt'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    teacherId: t.identity(),
    title: t.string(),
    description: t.string().optional(),
    createdAt: t.timestamp(),
  }
);

export const CourseTask = table(
  {
    public: true,
    indexes: [
      { accessor: 'course_task_course_id', algorithm: 'btree', columns: ['courseId'] },
      { accessor: 'course_task_created_by', algorithm: 'btree', columns: ['createdBy'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    courseId: t.u64(),
    title: t.string(),
    description: t.string().optional(),
    points: t.u64(),
    dueAtMicros: t.u64().optional(),
    createdBy: t.identity(),
    createdAt: t.timestamp(),
  }
);

export const CourseEnrollment = table(
  {
    public: true,
    indexes: [
      { accessor: 'course_enrollment_course_id', algorithm: 'btree', columns: ['courseId'] },
      { accessor: 'course_enrollment_student_id', algorithm: 'btree', columns: ['studentId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    courseId: t.u64(),
    studentId: t.identity(),
    joinedAt: t.timestamp(),
  }
);

export const TaskGroup = table(
  {
    public: true,
    indexes: [
      { accessor: 'task_group_course_id', algorithm: 'btree', columns: ['courseId'] },
      { accessor: 'task_group_task_id', algorithm: 'btree', columns: ['taskId'] },
      { accessor: 'task_group_created_by', algorithm: 'btree', columns: ['createdBy'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    courseId: t.u64(),
    taskId: t.u64(),
    name: t.string(),
    createdBy: t.identity(),
    createdAt: t.timestamp(),
  }
);

export const TaskGroupMember = table(
  {
    public: true,
    indexes: [
      { accessor: 'task_group_member_group_id', algorithm: 'btree', columns: ['groupId'] },
      { accessor: 'task_group_member_student_id', algorithm: 'btree', columns: ['studentId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    groupId: t.u64(),
    studentId: t.identity(),
    joinedAt: t.timestamp(),
  }
);

export const TaskSubmission = table(
  {
    public: true,
    indexes: [
      { accessor: 'task_submission_task_id', algorithm: 'btree', columns: ['taskId'] },
      { accessor: 'task_submission_group_id', algorithm: 'btree', columns: ['groupId'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    taskId: t.u64(),
    groupId: t.u64(),
    submittedBy: t.identity(),
    content: t.string(),
    submittedAt: t.timestamp(),
    status: t.string(),
  }
);

export const TaskGrade = table(
  {
    public: true,
    indexes: [
      { accessor: 'task_grade_submission_id', algorithm: 'btree', columns: ['submissionId'] },
      { accessor: 'task_grade_graded_by', algorithm: 'btree', columns: ['gradedBy'] }
    ]
  },
  {
    id: t.u64().primaryKey().autoInc(),
    submissionId: t.u64(),
    gradedBy: t.identity(),
    score: t.u64(),
    feedback: t.string(),
    gradedAt: t.timestamp(),
  }
);

const spacetimedb = schema({
  person: table(
    { public: true },
    {
      name: t.string(),
    }
  ),
  // User ===
  user: User,
  // Groups
  study_group: table(
    { public: true },
    {
      id: t.u64().primaryKey().autoInc(),
      name: t.string()
    }
  ),
  user_group: table(
    {
      public: true,
      indexes: [
        { accessor: 'user_group_user_id', algorithm: 'btree', columns: ['userId'] },
        { accessor: 'user_group_group_id', algorithm: 'btree', columns: ['groupId'] }
      ]
    },
    {
      id: t.u64().primaryKey().autoInc(),
      userId: t.identity(),
      groupId: t.u64()
    }
  ),
  course: Course,
  course_task: CourseTask,
  course_enrollment: CourseEnrollment,
  task_group: TaskGroup,
  task_group_member: TaskGroupMember,
  task_submission: TaskSubmission,
  task_grade: TaskGrade,
  // Chat sessions (one row per conversation)
  chat_session: ChatSession,
  // Chat messages persisted for replay/resume.
  chat_message: ChatMessage,
  // Membership for invited users.
  chat_session_member: ChatSessionMember,
  // Single-use invite codes to join a chat.
  chat_session_invite: ChatSessionInvite
});

spacetimedb.view(
  { name: 'my_chat_session', public: true },
  t.array(ChatSession.rowType),
  (ctx) => {
    const sessions = [...ctx.db.chat_session.chat_session_owner_id.filter(ctx.sender)];
    const seenSessionIds = new Set(sessions.map((session) => session.id.toString()));

    for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
      const session = ctx.db.chat_session.id.find(member.sessionId);
      if (session && !seenSessionIds.has(session.id.toString())) {
        seenSessionIds.add(session.id.toString());
        sessions.push(session);
      }
    }

    return sessions;
  }
);

spacetimedb.view(
  { name: 'my_user', public: true },
  t.array(User.rowType),
  (ctx) => {
    const me = ctx.db.user.id.find(ctx.sender);
    return me ? [me] : [];
  }
);

spacetimedb.view(
  { name: 'my_chat_message', public: true },
  t.array(ChatMessage.rowType),
  (ctx) => {
    const allowedSessionIds = new Set<string>();

    for (const session of ctx.db.chat_session.chat_session_owner_id.filter(ctx.sender)) {
      allowedSessionIds.add(session.id.toString());
    }

    for (const member of ctx.db.chat_session_member.chat_session_member_user_id.filter(ctx.sender)) {
      allowedSessionIds.add(member.sessionId.toString());
    }

    const messages = [];
    const seenMessageIds = new Set<string>();

    for (const sessionIdText of allowedSessionIds) {
      const sessionId = BigInt(sessionIdText);
      for (const message of ctx.db.chat_message.chat_message_session_id.filter(sessionId)) {
        const messageId = message.id.toString();
        if (!seenMessageIds.has(messageId)) {
          seenMessageIds.add(messageId);
          messages.push(message);
        }
      }
    }

    return messages;
  }
);

export default spacetimedb;