// Routes
import { Server } from 'restify'
import * as housesController from './Houses.controller'
import * as authMiddleware from '@/app/middlewares/authentication'

const accountsRoutes = (app: Server): void => {
  app.post(
    '/houses',
    // authMiddleware.verifyAuthentication,
    housesController.create
  )
}

export default accountsRoutes
