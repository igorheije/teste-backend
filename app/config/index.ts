import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

export default {
  secret: process.env.SECRET || '2b06b949-68f2-4147',
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database: {
    url: process.env.DATABASE_URL,
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
}
