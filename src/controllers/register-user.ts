import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { registerUserService } from '../services/register-user'

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, username, email, password } = registerUserSchema.parse(request.body)

  try {
    const user = await registerUserService({
      name,
      username,
      email,
      password
    })

    return reply.status(201).send({ user })
  } catch (err) {
    return reply.status(400).send({ message: err.message })
  }
}
