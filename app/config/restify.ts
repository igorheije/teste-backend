import restify, { Server } from 'restify'
import cors from 'cors'

// Routes
import accountsRoutes from '@/app/api/v1/Accounts/Accounts.routes'

export default (): Server => {
  const app = restify.createServer({
    name: 'backend',
    version: '1.0.0',
  })

  app.use(cors())
  app.use(restify.plugins.acceptParser(app.acceptable))
  app.use(restify.plugins.queryParser())
  app.use(restify.plugins.bodyParser())

  // Routes
  accountsRoutes(app)

  return app
}
