import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'


const dialect = new PostgresDialect({
  pool: new Pool({
  host: process.env.DB_HOST,
  user: process.env.ADMIN_DB_USERNAME,
  password: process.env.ADMIN_DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  max: 10,
  })
})

export {dialect};
