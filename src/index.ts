import fastify from 'fastify'

import { routes as healthRoutes } from './health/health.routes'
import { routes as mountainRoutes } from './mountain/mountain.routes'

const server = fastify()

server.register(healthRoutes)
server.register(mountainRoutes)

server.listen(3366, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
