import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import * as mountainService from './mountain.service'

import { TaskRunner } from '../lib/task-runner.service'

const runner = new TaskRunner()

export const routes = fp(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get(
      '/mountain',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        return mountainService.getAll()
      }
    )

    fastify.get(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        // validation and stuff
        const name = (request.params as any).name as string
        const mountain = mountainService.get(name)
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
        const result = mountainService.insert(name)
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
        const result = mountainService.remove(name)
        if (result) {
          reply.code(200).send()
        }
        reply.code(404).send()
      }
    )
  }
)
