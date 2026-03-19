import { schema, table, t } from 'spacetimedb/server';

const spacetimedb = schema({
  person: table(
    { public: true },
    {
      name: t.string(),
    }
  ),
  user: table(
    {public: true},
    {
        id: t.u64().primaryKey().autoInc(),
        name: t.string()
    }
  )
});
export default spacetimedb;