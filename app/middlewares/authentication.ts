import { Request, Response, Next } from 'restify'
import * as errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import config from '@/app/config'

type TokenDecodedTypes = {
  id?: string
  type?: 'mobile' | 'manager' | 'provider'
  iat?: number
  exp?: number
}

export const decodeToken = (token: string): TokenDecodedTypes | null => {
  const parts = token.split(' ')

  let data = null
  jwt.verify(parts[1], config.secret, (err: any, decoded: any) => {
    if (err) return null
    data = decoded
  })
  return data
}

const verifyJWT = (authorization: string) => {
  if (!authorization)
    return {
      errors: new errors.NotAuthorizedError('Token não informado'),
    }

  const parts = authorization.split(' ')
  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return {
      errors: new errors.NotAuthorizedError('Token mal formatado'),
    }
  }

  let tokenError = ''

  jwt.verify(token, config.secret, (err: any) => {
    if (err) {
      tokenError = err.message
    }
  })

  if (tokenError)
    return {
      errors: new errors.NotAuthorizedError(tokenError),
    }

  return {
    status: true,
    message: 'Token validado com sucesso',
  }
}

export const verifyInternalAuth = async (
  req: Request,
  res: Response,
  next: Next
) => {
  const { authentication }: any = req.headers

  if (!authentication) {
    return next(new errors.NotAuthorizedError('Token não informado'))
  }

  if (authentication !== process.env.AUTHENTICATION) {
    return next(new errors.ForbiddenError('Chave de autenticação não é valida'))
  }

  return next()
}

export const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: Next
) => {
  const { authorization }: any = req.headers

  if (!authorization) {
    return next(new errors.NotAuthorizedError('Token não informado'))
  }

  const parts = authorization.split(' ')
  const [scheme] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return {
      errors: new errors.ForbiddenError(`Token não é do tipo ${scheme}`),
    }
  }

  const verify = verifyJWT(authorization)

  if (!verify.status) {
    return next(verify.errors)
  }

  return next()
}
