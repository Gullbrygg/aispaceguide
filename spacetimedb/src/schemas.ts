import { schema, table, t } from 'spacetimedb/server';

const spacetimedb = schema({
  person: table(
    { public: true },
    {
      name: t.string(),
    }
  ),
  // User ===
  user: table(
    { public: true },
    {
      id: t.identity().primaryKey(),
      clerkId: t.string(),
      name: t.string().optional(),
      createdAt: t.timestamp(),
    }
  ),
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
  )
});
export default spacetimedb;