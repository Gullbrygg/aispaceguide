'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { useSpacetimeDB, useTable } from 'spacetimedb/react';
import { tables } from '@/src/module_bindings';

type ReducerPayload = Record<string, unknown>;

type GradeDraft = {
  score: string;
  feedback: string;
};

function formatMicros(micros: bigint): string {
  return new Date(Number(micros / 1000n)).toLocaleString('nb-NO');
}

function shortIdentity(hex: string): string {
  if (hex.length < 14) return hex;
  return `${hex.slice(0, 8)}...${hex.slice(-4)}`;
}

function LeaveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export default function TasksPage() {
  const conn = useSpacetimeDB();

  const [myUsers] = useTable(tables.user);
  const [courses] = useTable(tables.course);
  const [tasks] = useTable(tables.course_task);
  const [enrollments] = useTable(tables.course_enrollment);
  const [groups] = useTable(tables.task_group);
  const [memberships] = useTable(tables.task_group_member);
  const [submissions] = useTable(tables.task_submission);
  const [grades] = useTable(tables.task_grade);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPoints, setTaskPoints] = useState('100');

  const [groupName, setGroupName] = useState('');
  const [submissionText, setSubmissionText] = useState('');

  const [gradeDrafts, setGradeDrafts] = useState<Record<string, GradeDraft>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const myIdentityHex = conn.identity?.toHexString() ?? null;
  const me = myUsers.find((candidate) => candidate.id.toHexString() === myIdentityHex) ?? null;
  const myRole = me?.role ?? null;

  const userLabelByIdentity = useMemo(() => {
    const labels = new Map<string, string>();
    for (const user of myUsers) {
      const id = user.id.toHexString();
      const preferredName = user.name?.trim();
      const fallback = user.email?.trim();
      labels.set(id, preferredName || fallback || shortIdentity(id));
    }
    return labels;
  }, [myUsers]);

  const groupMemberCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const membership of memberships) {
      const key = membership.groupId.toString();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return counts;
  }, [memberships]);

  function getUserLabel(identityHex: string): string {
    return userLabelByIdentity.get(identityHex) ?? shortIdentity(identityHex);
  }

  function callReducer(camelName: string, snakeName: string, args: ReducerPayload) {
    const liveConnection = conn.getConnection() as any;
    if (!liveConnection) throw new Error('SpacetimeDB er ikke tilkoblet ennå');
    const reducerMap = liveConnection.reducers as Record<string, (payload: ReducerPayload) => void> | undefined;
    if (!reducerMap) throw new Error('Reducers er ikke tilgjengelige');
    const call = reducerMap[camelName] ?? reducerMap[snakeName];
    if (!call) throw new Error(`Reducer ikke funnet: ${camelName}`);
    call(args);
  }

  const visibleCourses = useMemo(() => {
    if (!myIdentityHex) return [];
    if (myRole === 'teacher') {
      return courses.filter((course) => course.teacherId.toHexString() === myIdentityHex);
    }
    const myCourseIds = new Set(
      enrollments
        .filter((row) => row.studentId.toHexString() === myIdentityHex)
        .map((row) => row.courseId.toString())
    );
    return courses.filter((course) => myCourseIds.has(course.id.toString()));
  }, [courses, enrollments, myIdentityHex, myRole]);

  const allTeacherCourses = useMemo(() => {
    if (myRole !== 'student') return [];
    const joinedIds = new Set(
      enrollments
        .filter((row) => row.studentId.toHexString() === myIdentityHex)
        .map((row) => row.courseId.toString())
    );
    return courses.filter((course) => !joinedIds.has(course.id.toString()));
  }, [courses, enrollments, myIdentityHex, myRole]);

  const selectedCourse = useMemo(
    () => visibleCourses.find((course) => course.id.toString() === selectedCourseId) ?? null,
    [visibleCourses, selectedCourseId]
  );

  const selectedCourseTasks = useMemo(() => {
    if (!selectedCourse) return [];
    return tasks
      .filter((task) => task.courseId.toString() === selectedCourse.id.toString())
      .sort((a, b) => Number(b.createdAt.microsSinceUnixEpoch - a.createdAt.microsSinceUnixEpoch));
  }, [selectedCourse, tasks]);

  const selectedTask = useMemo(
    () => selectedCourseTasks.find((task) => task.id.toString() === selectedTaskId) ?? null,
    [selectedCourseTasks, selectedTaskId]
  );

  const selectedTaskGroups = useMemo(() => {
    if (!selectedTask) return [];
    return groups.filter((group) => group.taskId.toString() === selectedTask.id.toString());
  }, [groups, selectedTask]);

  const myTaskMembership = useMemo(() => {
    if (!selectedTask || !myIdentityHex) return null;
    const myMemberships = memberships.filter((member) => member.studentId.toHexString() === myIdentityHex);
    for (const membership of myMemberships) {
      const group = groups.find((candidate) => candidate.id.toString() === membership.groupId.toString());
      if (group && group.taskId.toString() === selectedTask.id.toString()) {
        return { membership, group };
      }
    }
    return null;
  }, [groups, memberships, myIdentityHex, selectedTask]);

  const selectedTaskSubmissions = useMemo(() => {
    if (!selectedTask) return [];
    return submissions.filter((submission) => submission.taskId.toString() === selectedTask.id.toString());
  }, [selectedTask, submissions]);

  useEffect(() => {
    if (!selectedCourseId && visibleCourses.length > 0) {
      setSelectedCourseId(visibleCourses[0].id.toString());
      return;
    }
    if (selectedCourseId && !visibleCourses.some((course) => course.id.toString() === selectedCourseId)) {
      setSelectedCourseId(visibleCourses[0]?.id.toString() ?? null);
      setSelectedTaskId(null);
    }
  }, [visibleCourses, selectedCourseId]);

  useEffect(() => {
    if (!selectedTaskId && selectedCourseTasks.length > 0) {
      setSelectedTaskId(selectedCourseTasks[0].id.toString());
      return;
    }
    if (selectedTaskId && !selectedCourseTasks.some((task) => task.id.toString() === selectedTaskId)) {
      setSelectedTaskId(selectedCourseTasks[0]?.id.toString() ?? null);
    }
  }, [selectedCourseTasks, selectedTaskId]);

  async function runAction(action: () => void | Promise<void>) {
    setPending(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Handlingen mislyktes');
    } finally {
      setPending(false);
    }
  }

  function handleSetRole(role: 'teacher' | 'student') {
    runAction(() => { callReducer('setUserRole', 'set_user_role', { role }); });
  }

  function handleCreateCourse(e: FormEvent) {
    e.preventDefault();
    if (!courseTitle.trim()) return;
    runAction(() => {
      callReducer('createCourse', 'create_course', { title: courseTitle, description: courseDescription || undefined });
      setCourseTitle('');
      setCourseDescription('');
    });
  }

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();
    if (!selectedCourse || !taskTitle.trim()) return;
    runAction(() => {
      const parsedPoints = BigInt(Math.max(1, Number(taskPoints || '100')));
      callReducer('createCourseTask', 'create_course_task', {
        courseId: selectedCourse.id,
        title: taskTitle,
        description: taskDescription || undefined,
        points: parsedPoints,
      });
      setTaskTitle('');
      setTaskDescription('');
      setTaskPoints('100');
    });
  }

  function handleJoinCourse(courseId: bigint) {
    runAction(() => { callReducer('joinCourse', 'join_course', { courseId }); });
  }

  function handleLeaveCourse(courseId: bigint) {
    runAction(() => {
      callReducer('leaveCourse', 'leave_course', { courseId });
      if (selectedCourseId === courseId.toString()) setSelectedTaskId(null);
    });
  }

  function handleCreateGroup(e: FormEvent) {
    e.preventDefault();
    if (!selectedCourse || !selectedTask || !groupName.trim()) return;
    runAction(() => {
      callReducer('createTaskGroup', 'create_task_group', { courseId: selectedCourse.id, taskId: selectedTask.id, name: groupName });
      setGroupName('');
    });
  }

  function handleJoinGroup(groupId: bigint) {
    runAction(() => { callReducer('joinTaskGroup', 'join_task_group', { groupId }); });
  }

  function handleLeaveGroup(groupId: bigint) {
    runAction(() => { callReducer('leaveTaskGroup', 'leave_task_group', { groupId }); });
  }

  function handleSubmitTask(e: FormEvent) {
    e.preventDefault();
    if (!selectedTask || !myTaskMembership || !submissionText.trim()) return;
    runAction(() => {
      callReducer('submitTaskGroupWork', 'submit_task_group_work', {
        taskId: selectedTask.id,
        groupId: myTaskMembership.group.id,
        content: submissionText,
      });
      setSubmissionText('');
    });
  }

  function handleGrade(submissionId: bigint) {
    const draft = gradeDrafts[submissionId.toString()];
    if (!draft?.feedback?.trim()) return;
    runAction(() => {
      callReducer('gradeTaskSubmission', 'grade_task_submission', {
        submissionId,
        score: BigInt(Math.max(0, Number(draft.score || '0'))),
        feedback: draft.feedback,
      });
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      <SignedOut>
        <div className="rounded-xl border border-gray-200 p-6 bg-white">
          <h1 className="text-2xl font-semibold text-gray-900">Oppgavearbeidsrom</h1>
          <p className="text-gray-600 mt-2">Logg inn for å administrere kurs, oppgaver, grupper og vurderinger.</p>
          <SignInButton>
            <button className="mt-4 px-4 py-2 rounded-lg bg-gray-900 text-white cursor-pointer">Logg inn</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <section className="rounded-xl border border-gray-200 p-6 bg-white space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">Kursoppgaver</h1>
          <p className="text-gray-600">Alt nedenfor synkroniseres i sanntid via SpacetimeDB.</p>

          {!myRole && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">Velg rollen din for å fortsette.</p>
              <div className="mt-3 flex gap-2">
                <button type="button" disabled={pending} onClick={() => handleSetRole('teacher')}
                  className="px-3 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                  Jeg er lærer
                </button>
                <button type="button" disabled={pending} onClick={() => handleSetRole('student')}
                  className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 disabled:opacity-60 cursor-pointer">
                  Jeg er student
                </button>
              </div>
            </div>
          )}

          {myRole && (
            <div className="text-sm text-gray-700">
              Rolle: <span className="font-semibold">{myRole === 'teacher' ? 'Lærer' : 'Student'}</span>
              <span className="mx-2">|</span>
              Bruker: {myIdentityHex ? getUserLabel(myIdentityHex) : 'ukjent'}
              <span className="mx-2">|</span>
              <button type="button" className="underline cursor-pointer" disabled={pending}
                onClick={() => handleSetRole(myRole === 'teacher' ? 'student' : 'teacher')}>
                Bytt rolle
              </button>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
          )}
        </section>

        {myRole === 'teacher' && (
          <section>
            <form onSubmit={handleCreateCourse} className="rounded-xl border border-gray-200 p-6 bg-white space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Opprett kurs</h2>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Kurstittel"
                value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
              <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} placeholder="Beskrivelse"
                value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
              <button type="submit" disabled={pending} className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                Opprett kurs
              </button>
            </form>
          </section>
        )}

        {myRole === 'student' && (
          <section className="rounded-xl border border-gray-200 p-6 bg-white space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Meld deg på kurs</h2>
            {allTeacherCourses.length === 0 && <p className="text-sm text-gray-600">Ingen tilgjengelige kurs å melde seg på.</p>}
            {allTeacherCourses.map((course) => (
              <div key={course.id.toString()} className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-600">Lærer: {getUserLabel(course.teacherId.toHexString())}</p>
                </div>
                <button type="button" disabled={pending} onClick={() => handleJoinCourse(course.id)}
                  className="px-3 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                  Meld på
                </button>
              </div>
            ))}
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6 bg-white space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Mine kurs</h2>
            {visibleCourses.length === 0 && <p className="text-sm text-gray-600">Ingen kurs ennå.</p>}
            {visibleCourses.map((course) => (
              <div key={course.id.toString()}
                className={`relative group p-3 rounded-lg border ${selectedCourseId === course.id.toString() ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                <button type="button" onClick={() => setSelectedCourseId(course.id.toString())} className="w-full text-left pr-10">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-xs text-gray-600">Lærer: {getUserLabel(course.teacherId.toHexString())}</p>
                  <p className="text-xs text-gray-600 mt-1">{course.description ?? 'Ingen beskrivelse'}</p>
                </button>
                {myRole === 'student' && (
                  <button type="button" disabled={pending} onClick={() => handleLeaveCourse(course.id)}
                    aria-label="Meld av kurs" title="Meld av kurs"
                    className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                    <LeaveIcon />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-200 p-6 bg-white space-y-3 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">Oppgaver i valgt kurs</h2>
            {selectedCourse && myRole === 'teacher' && (
              <form onSubmit={handleCreateTask} className="grid gap-2 md:grid-cols-4 border border-gray-200 rounded-lg p-3">
                <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Oppgavetittel"
                  value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Poeng"
                  value={taskPoints} onChange={(e) => setTaskPoints(e.target.value)} />
                <input className="border border-gray-300 rounded-lg px-3 py-2 md:col-span-2" placeholder="Oppgavebeskrivelse"
                  value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                <button type="submit" disabled={pending}
                  className="px-3 py-2 rounded-lg bg-gray-900 text-white md:col-span-4 disabled:opacity-60 cursor-pointer">
                  Legg til oppgave
                </button>
              </form>
            )}
            {selectedCourseTasks.length === 0 && <p className="text-sm text-gray-600">Ingen oppgaver for dette kurset.</p>}
            {selectedCourseTasks.map((task) => (
              <button type="button" key={task.id.toString()} onClick={() => setSelectedTaskId(task.id.toString())}
                className={`w-full text-left p-3 rounded-lg border cursor-pointer ${selectedTaskId === task.id.toString() ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}`}>
                <p className="font-medium text-gray-900">{task.title}</p>
                <p className="text-xs text-gray-600">Poeng: {task.points.toString()} | {task.description ?? 'Ingen detaljer'}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedTask && (
          <section className="rounded-xl border border-gray-200 p-6 bg-white space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Gruppesamarbeid: {selectedTask.title}</h2>

            {myRole === 'student' && (
              <>
                <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between gap-3 group">
                  <div>
                    <p className="font-medium text-gray-900">Min gruppe</p>
                    <p className="text-sm text-gray-600">
                      {myTaskMembership ? myTaskMembership.group.name : 'Bli med i eller opprett en gruppe for å samarbeide.'}
                    </p>
                  </div>
                  {myTaskMembership && (
                    <button type="button" disabled={pending} onClick={() => handleLeaveGroup(myTaskMembership.group.id)}
                      aria-label="Forlat gruppe" title="Forlat gruppe"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                      <LeaveIcon />
                    </button>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <form onSubmit={handleCreateGroup} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <p className="font-medium text-gray-900">Opprett gruppe</p>
                    <input className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Gruppenavn"
                      value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <button type="submit" disabled={pending || !!myTaskMembership}
                      className="px-3 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                      Opprett og bli med
                    </button>
                  </form>

                  <div className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <p className="font-medium text-gray-900">Bli med i eksisterende gruppe</p>
                    {selectedTaskGroups.length === 0 && <p className="text-sm text-gray-600">Ingen grupper ennå.</p>}
                    {selectedTaskGroups.map((group) => (
                      <div key={group.id.toString()} className="flex items-center justify-between border border-gray-200 rounded-lg p-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{group.name}</p>
                          <p className="text-xs text-gray-600">
                            Opprettet av: {getUserLabel(group.createdBy.toHexString())} | Medlemmer: {groupMemberCounts.get(group.id.toString()) ?? 0}
                          </p>
                        </div>
                        <button type="button" disabled={pending || !!myTaskMembership} onClick={() => handleJoinGroup(group.id)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-sm disabled:opacity-60 cursor-pointer">
                          Bli med
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmitTask} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <p className="font-medium text-gray-900">Lever gruppearbeid</p>
                  <p className="text-xs text-gray-600">
                    Din gruppe: {myTaskMembership ? myTaskMembership.group.name : 'Bli med i eller opprett en gruppe først'}
                  </p>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={4}
                    placeholder="Lim inn gruppesvaret, sammendraget eller lenken her."
                    value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} />
                  <button type="submit" disabled={pending || !myTaskMembership}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                    Lever oppgave
                  </button>
                </form>
              </>
            )}

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Innleveringer</h3>
              {selectedTaskSubmissions.length === 0 && <p className="text-sm text-gray-600">Ingen innleveringer ennå.</p>}
              {selectedTaskSubmissions.map((submission) => {
                const group = groups.find((candidate) => candidate.id.toString() === submission.groupId.toString());
                const grade = grades.find((candidate) => candidate.submissionId.toString() === submission.id.toString());
                const draft = gradeDrafts[submission.id.toString()] ?? {
                  score: grade?.score.toString() ?? '',
                  feedback: grade?.feedback ?? '',
                };
                return (
                  <div key={submission.id.toString()} className="border border-gray-200 rounded-lg p-3 space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      Gruppe: {group?.name ?? 'Ukjent'} | Levert: {formatMicros(submission.submittedAt.microsSinceUnixEpoch)}
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.content}</p>
                    {grade && (
                      <p className="text-sm text-emerald-700">
                        Karakter: {grade.score.toString()} | Tilbakemelding: {grade.feedback}
                      </p>
                    )}
                    {myRole === 'teacher' && (
                      <div className="grid gap-2 md:grid-cols-[140px_1fr_auto]">
                        <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Poeng"
                          value={draft.score}
                          onChange={(e) => setGradeDrafts((cur) => ({ ...cur, [submission.id.toString()]: { ...draft, score: e.target.value } }))} />
                        <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Tilbakemelding"
                          value={draft.feedback}
                          onChange={(e) => setGradeDrafts((cur) => ({ ...cur, [submission.id.toString()]: { ...draft, feedback: e.target.value } }))} />
                        <button type="button" disabled={pending} onClick={() => handleGrade(submission.id)}
                          className="px-4 py-2 rounded-lg bg-gray-900 text-white disabled:opacity-60 cursor-pointer">
                          Lagre karakter
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </SignedIn>
    </div>
  );
}
