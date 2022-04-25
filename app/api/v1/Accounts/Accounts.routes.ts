// Routes
import { Server } from 'restify'
import * as accountsController from './Accounts.controller'

const accountsRoutes = (app: Server): void => {
  app.post('/users', accountsController.create)
  app.post('/users/login', accountsController.signin)
  app.get('/user/me', accountsController.getMe)
}

export default accountsRoutes
