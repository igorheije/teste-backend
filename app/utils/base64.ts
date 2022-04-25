import { Buffer } from 'buffer'

export const base64Encoding = (str: string): string => {
  const buff = Buffer.from(str, 'utf-8')
  const base64 = buff.toString('base64')

  return base64
}

export const base64Decoding = (base64: string): string => {
  const buff = Buffer.from(base64, 'base64')
  const str = buff.toString('utf-8')

  return str
}
