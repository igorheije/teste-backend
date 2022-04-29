// Routes
import { Server } from 'restify'
import * as bookingsController from './Bookings.controller'
import * as authMiddleware from '@/app/middlewares/authentication'

const accountsRoutes = (app: Server): void => {
  app.post(
    '/bookings',
    authMiddleware.verifyAuthentication,
    bookingsController.create
  )
}

export default accountsRoutes
