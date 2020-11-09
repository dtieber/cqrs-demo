import fastify from 'fastify'

import { routes as healthRoutes } from './health/health.routes'

const server = fastify()

server.register(healthRoutes)

server.listen(3366, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
