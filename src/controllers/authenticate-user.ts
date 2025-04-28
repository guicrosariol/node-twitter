import type { FastifyReply, FastifyRequest } from "fastify";
import { authenticateUserService } from "../services/authenticate-user";
import { z } from "zod";

export async function authenticaUserController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserSchema = z.object({
    emailOrUsername: z.string(),
    password: z.string()
  })

  const { emailOrUsername, password } = authenticateUserSchema.parse(request.body)

  try {
    await authenticateUserService({
      emailOrUsername,
      password
    })

    return reply.status(200).send()
  } catch (err) {
    return reply.status(401).send({ message: err.message })
  }
}