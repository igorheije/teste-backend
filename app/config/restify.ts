import restify, { Server } from 'restify'
import cors from 'cors'

// Routes
import accountsRoutes from '@/app/api/v1/Accounts/Accounts.routes'
import housesRoutes from '@/app/api/v1/Houses/Houses.routes'
import bookingsRoutes from '@/app/api/v1/Bookings/Bookings.routes'

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
  bookingsRoutes(app)
  housesRoutes(app)

  return app
}
