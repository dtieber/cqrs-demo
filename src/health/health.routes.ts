import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'

export const routes = fp(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get(
      '/health',
      async (request: FastifyRequest, reply: FastifyReply) => {
        reply.code(204).header('content-type', 'application/json').send()
      }
    )
  }
)
