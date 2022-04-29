// Controller
import { Request, Response, Next } from 'restify'
import * as errors from 'restify-errors'
import * as bookingsServices from './Bookings.service'
import apiErrors from '@/app/constants/apiErrors'

export const create = async (req: Request, res: Response, next: Next) => {
  const data = req.body

  try {
    const response = await bookingsServices.create(data)
    res.send(response)

    return next()
  } catch (error) {
    return next(
      error || new errors.InternalServerError(apiErrors.internalServerError)
    )
  }
}
