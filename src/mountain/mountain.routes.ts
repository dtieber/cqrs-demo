import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { v4 as uuidv4 } from 'uuid'

import * as mountainService from './mountain.service'
import {
  GetAllMountainsQuery,
  GetAllMountainsQueryHandler,
} from './get-all-mountains.query'
import { TaskRunner } from '../lib/task-runner.service'
import {
  GetMountainQuery,
  GetMountainQueryHandler,
} from './get-mountain-by-id.query'

const runner = new TaskRunner()

export const routes = fp(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get(
      '/mountain',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const requestId = uuidv4()
        const query = GetAllMountainsQuery(requestId)
        const getAllMountainsHandler = new GetAllMountainsQueryHandler(query)

        // mind the 'await' here: the function (!) is suspended until the callback completes
        const result = await runner.run(getAllMountainsHandler)

        return result
      }
    )

    fastify.get(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        const requestId = uuidv4()
        const name = (request.params as any).name as string
        const query = GetMountainQuery(requestId, name)
        const handler = new GetMountainQueryHandler(query)

        // mind the 'await' here: the function (!) is suspended until the callback completes
        const mountain = await runner.run(handler)

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
