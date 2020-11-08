import fastify from 'fastify'

const server = fastify()

server.get('/health', async (request, reply) => {
  return {}
})

server.listen(3366, (err, address) => {
  if(err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
