import dotenv from 'dotenv'

dotenv.config({
  path: process.cwd() + '/.env',
})

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_HOST,
  default_pass: process.env.DEFAULT_PASS,
}
