import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'


// const dialect = new PostgresDialect({
//   pool: new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.ADMIN_DB_USERNAME,
//   password: process.env.ADMIN_DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: 5432,
//   max: 10,
//   })
// })


const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from .env
    ssl: {
      rejectUnauthorized: false, // Important for connecting to Neon
    },
  }),
});

export {dialect};
