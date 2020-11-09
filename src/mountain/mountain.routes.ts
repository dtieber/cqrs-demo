import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { get, getAll, insert, remove } from './mountain.service'

export const routes = fp(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get(
      '/mountain',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        return getAll()
      }
    )

    fastify.get(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        const name = (request.params as any).name as string
        const mountain = get(name)
        if (mountain) {
          reply
            .code(201)
            .header('content-type', 'application/json')
            .send(mountain)
        }
        reply.code(404).send()
      }
    )

    fastify.post(
      '/mountain',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        const name = (request.body as any).name as string
        const result = insert(name)
        if (result) {
          reply.code(201).header('content-type', 'application/json').send()
        }
        reply.code(404).send()
      }
    )

    fastify.delete(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        const name = (request.params as any).name as string
        const result = remove(name)
        if (result) {
          reply.code(200).send()
        }
        reply.code(404).send()
      }
    )
  }
)
