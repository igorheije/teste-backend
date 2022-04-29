// Controller
import { Request, Response, Next } from 'restify'
import * as errors from 'restify-errors'
import * as accountsServices from './Accounts.service'
import apiErrors from '@/app/constants/apiErrors'
import { decodeToken } from '@/app/middlewares/authentication'

export const create = async (req: Request, res: Response, next: Next) => {
  const data = req.body

  try {
    const response = await accountsServices.create(data)
    res.send(response)

    return next()
  } catch (error) {
    return next(
      error || new errors.InternalServerError(apiErrors.internalServerError)
    )
  }
}

export const signin = async (req: Request, res: Response, next: Next) => {
  const { email, password } = req.body

  try {
    const response = await accountsServices.signin({ email, password })
    res.send(response)

    return next()
  } catch (error) {
    return next(
      error || new errors.InternalServerError(apiErrors.internalServerError)
    )
  }
}

export const getMe = async (req: Request, res: Response, next: Next) => {
  const { authorization }: any = req.headers
  const userId: any = decodeToken(authorization)

  try {
    const response = await accountsServices.getMe(userId.id)
    res.send(response)

    return next()
  } catch (error) {
    return next(
      error || new errors.InternalServerError(apiErrors.internalServerError)
    )
  }
}
