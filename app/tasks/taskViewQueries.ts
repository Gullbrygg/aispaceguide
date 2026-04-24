import { makeQueryBuilder, schema, t, table } from 'spacetimedb';

const MyUserRow = t.row({
  id: t.identity().primaryKey(),
  clerkId: t.string().name('clerk_id'),
  name: t.option(t.string()),
  email: t.option(t.string()),
  role: t.option(t.string()),
  createdAt: t.timestamp().name('created_at'),
});

const CourseRow = t.row({
  id: t.u64().primaryKey(),
  teacherId: t.identity().name('teacher_id'),
  title: t.string(),
  description: t.option(t.string()),
  createdAt: t.timestamp().name('created_at'),
});

const CourseTaskRow = t.row({
  id: t.u64().primaryKey(),
  courseId: t.u64().name('course_id'),
  title: t.string(),
  description: t.option(t.string()),
  points: t.u64(),
  dueAtMicros: t.option(t.u64()).name('due_at_micros'),
  createdBy: t.identity().name('created_by'),
  createdAt: t.timestamp().name('created_at'),
});

const CourseEnrollmentRow = t.row({
  id: t.u64().primaryKey(),
  courseId: t.u64().name('course_id'),
  studentId: t.identity().name('student_id'),
  joinedAt: t.timestamp().name('joined_at'),
});

const TaskGroupRow = t.row({
  id: t.u64().primaryKey(),
  courseId: t.u64().name('course_id'),
  taskId: t.u64().name('task_id'),
  name: t.string(),
  createdBy: t.identity().name('created_by'),
  createdAt: t.timestamp().name('created_at'),
});

const TaskGroupMemberRow = t.row({
  id: t.u64().primaryKey(),
  groupId: t.u64().name('group_id'),
  studentId: t.identity().name('student_id'),
  joinedAt: t.timestamp().name('joined_at'),
});

const TaskSubmissionRow = t.row({
  id: t.u64().primaryKey(),
  taskId: t.u64().name('task_id'),
  groupId: t.u64().name('group_id'),
  submittedBy: t.identity().name('submitted_by'),
  content: t.string(),
  submittedAt: t.timestamp().name('submitted_at'),
  status: t.string(),
});

const TaskGradeRow = t.row({
  id: t.u64().primaryKey(),
  submissionId: t.u64().name('submission_id'),
  gradedBy: t.identity().name('graded_by'),
  score: t.u64(),
  feedback: t.string(),
  gradedAt: t.timestamp().name('graded_at'),
});

const taskSchema = schema({
  my_user: table({
    name: 'my_user',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'my_user_id_key', constraint: 'unique', columns: ['id'] }],
  }, MyUserRow),
  course: table({
    name: 'course',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'course_id_key', constraint: 'unique', columns: ['id'] }],
  }, CourseRow),
  course_task: table({
    name: 'course_task',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'course_task_id_key', constraint: 'unique', columns: ['id'] }],
  }, CourseTaskRow),
  course_enrollment: table({
    name: 'course_enrollment',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'course_enrollment_id_key', constraint: 'unique', columns: ['id'] }],
  }, CourseEnrollmentRow),
  task_group: table({
    name: 'task_group',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'task_group_id_key', constraint: 'unique', columns: ['id'] }],
  }, TaskGroupRow),
  task_group_member: table({
    name: 'task_group_member',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'task_group_member_id_key', constraint: 'unique', columns: ['id'] }],
  }, TaskGroupMemberRow),
  task_submission: table({
    name: 'task_submission',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'task_submission_id_key', constraint: 'unique', columns: ['id'] }],
  }, TaskSubmissionRow),
  task_grade: table({
    name: 'task_grade',
    indexes: [{ accessor: 'id', algorithm: 'btree', columns: ['id'] }],
    constraints: [{ name: 'task_grade_id_key', constraint: 'unique', columns: ['id'] }],
  }, TaskGradeRow),
});

export const taskViewTables = makeQueryBuilder(taskSchema.schemaType);
