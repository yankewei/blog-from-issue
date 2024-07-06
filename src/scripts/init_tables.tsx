import { db, sql } from "@vercel/postgres";

const client = await db.connect();
client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

function createTables() {
  const create_table_sqls = [
    `CREATE TABLE IF NOT EXISTS issues (
      id integer NOT NULL PRIMARY KEY,
      number integer NOT NULL,
      title varchar(255) NOT NULL,
      body TEXT NOT NULL,
      created_at timestamp NOT NULL,
      updated_at timestamp DEFAULT NULL,
      deleted_at timestamp DEFAULT NULL,
    )`,
  ];
  const promises = create_table_sqls.map((create_table_sql) => {
    return client.sql.create_table_sql;
  });

  Promise.all(promises)
    .then(function (create_result) {
      console.log(create_result);
    })
    .catch(function (reason) {
      throw new Error(reason);
    });
}

createTables();
