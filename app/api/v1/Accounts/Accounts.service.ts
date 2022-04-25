import { prisma } from '@/app/database/prismaClient'
import bcrypt from 'bcrypt'
import { createJwt } from '@/app/utils/jwt'
// Services

export const create = async (data: any) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })
  if (user) {
    throw new Error('User already exists')
  }

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
    },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      created_at: true,
    },
  })

  return newUser
}

export const signin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const user = await prisma.user.findFirst({
    where: { email },
  })

  if (!user) throw new Error('User already exists')

  if (user.status !== 'ACTIVE') throw new Error('User is not active')

  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) throw new Error('Password or email are wrong')

  const token = createJwt(user.id, 'provider')

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      created_at: user.created_at,
    },
    token,
  }
}

export const getMe = async (id: string) => {
  const nurse = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      created_at: true,
    },
  })

  if (!nurse) throw new Error('User not found')

  return nurse
}
