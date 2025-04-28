import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

interface User {
  name: string
  username: string
  email: string
  password: string
}

export async function userRegister(data: User) {
  const userAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username }
      ]
    }
  })

  if (userAlreadyExist) throw new Error('User already exist.')

  const password_hash = await hash(data.password, 6)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      username: data.username,
      email: data.email,
      password_hash
    }
  })

  const { password_hash: _, ...userData } = user

  return userData
}