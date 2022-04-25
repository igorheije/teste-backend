import { Request, Response, Next } from 'restify'
import * as errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import config from '@/app/config'
import { base64Decoding } from '@/app/utils/base64'

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

const verifyJwt = (authorization: string) => {
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

export const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: Next
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return next(new errors.NotAuthorizedError('Token não informado'))
  }

  const parts = authorization.split(' ')
  const [scheme, token] = parts

  if (scheme && !/^Basic$/i.test(scheme) && !/^Bearer$/i.test(scheme)) {
    return next(new errors.ForbiddenError(`Token não é do tipo ${scheme}`))
  }

  if (scheme === 'Basic') {
    const decode = base64Decoding(token).split(':')
    const [username, password] = decode

    if (
      username !== config.basicAuth.username &&
      password !== config.basicAuth.password
    ) {
      return next(new errors.ForbiddenError('Usuário não autorizado'))
    }
  } else {
    const verify = verifyJwt(authorization)
    const decodedToken: any = decodeToken(authorization)

    if (decodedToken && decodedToken.type) {
      if (!req.url?.includes(decodedToken.type)) {
        return next(
          new errors.ForbiddenError(
            'Você não tem autorização para acessar esse método'
          )
        )
      }
    }

    if (!verify.status) {
      return next(verify.errors)
    }
  }

  return next()
}
