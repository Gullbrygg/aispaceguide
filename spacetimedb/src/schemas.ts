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
      identity: t.identity().primaryKey(),
      clerkId: t.string(),
      name: t.string().optional(),
      createdAt: t.timestamp(),
    }
  ),
  groups: table(
    { public: true },
    {
      id:t.u64().primaryKey(),
      name: t.string()
    }
  ),
  user_group: table(
    {public: true,
      indexes: [
        { name: 'user_group_user_id', algorithm: 'btree', columns: ['userId']},
        { name: 'user_group_group_id', algorithm: 'btree', columns: ['groupId']}
      ]
    },
    {
      id: t.u64().primaryKey().autoInc(),
      userId: t.identity(),
      groupId: t.u64()
    }
  )
  // User ===
});
export default spacetimedb;