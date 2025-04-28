import { compare } from "bcryptjs"
import { prisma } from "../lib/prisma"

interface userCredentials {
  emailOrUsername: string
  password: string
}

export async function authenticateUserService({
  emailOrUsername,
  password
}: userCredentials) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    }
  })

  if (!user) throw Error('Invalid credentials')

  const isValidPassword = await compare(password, user.password_hash)
  if (!isValidPassword) throw Error('Invalid credentials')

  return
}