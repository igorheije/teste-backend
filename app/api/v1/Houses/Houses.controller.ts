// Controller
import { Request, Response, Next } from 'restify'
import * as errors from 'restify-errors'
import * as housesServices from './Houses.service'
import apiErrors from '@/app/constants/apiErrors'

export const create = async (req: Request, res: Response, next: Next) => {
  const data = req.body

  try {
    const response = await housesServices.create(data)
    res.send(response)

    return next()
  } catch (error) {
    return next(
      error || new errors.InternalServerError(apiErrors.internalServerError)
    )
  }
}
