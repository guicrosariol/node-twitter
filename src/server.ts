import fastify from "fastify";
import { env } from './env/index'
import { appRoutes } from './route'

export const app = fastify()

app.register(appRoutes)

app.listen({
  port: env.PORT
}).then(() => {
  console.log('🚀 Server is running!', env.PORT);
})
