// Services
import { prisma } from '@/app/database/prismaClient'

export const create = async (data: any) => {
  const newBooking = await prisma.booking.create({
    data: {
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
    },
  })

  return newBooking
}
