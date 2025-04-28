import type { FastifyInstance } from "fastify";
import { registerUserController } from "./controllers/register-user";
import { authenticaUserController } from "./controllers/authenticate-user";

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', registerUserController)
  app.post('/autheticate/user', authenticaUserController)
}