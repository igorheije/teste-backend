import server from '@/app/config/restify'
import logger from '@/app/config/logger'
import config from '@/app/config'
import 'reflect-metadata'

const app = server()
const port = config.port || 3333

app.listen(port, () => {
  logger.info(`🚀 Listening at ${app.name} ${app.url}`)
})
