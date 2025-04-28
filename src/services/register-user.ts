import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

interface User {
  name: string
  username: string
  email: string
  password: string
}

export async function registerUserService({
  name,
  username,
  email,
  password
}: User) {
  const userAlreadyExist = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        { username: username }
      ]
    }
  })

  if (userAlreadyExist) throw new Error('User already exist.')

  const password_hash = await hash(password, 6)

  const user = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password_hash
    }
  })

  const { password_hash: _, ...userData } = user

  return userData
}