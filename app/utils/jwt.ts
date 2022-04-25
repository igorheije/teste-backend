import jwt from 'jsonwebtoken'
import config from '@/app/config'

export const createJwt = (
  id: string,
  type: 'mobile' | 'manager' | 'provider',
  expiresIn = '12d'
) => {
  return jwt.sign({ id, type }, config.secret, {
    expiresIn,
  })
}
