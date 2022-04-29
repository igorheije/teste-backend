// Services
import { prisma } from '@/app/database/prismaClient'

export const create = async (data: any) => {
  const house = await prisma.house.findFirst({
    where: {
      title: data.title,
    },
  })
  if (house) {
    throw new Error('House already exists')
  }

  const newHouse = await prisma.house.create({
    data: {
      ...data,
    },
  })

  return newHouse
}
