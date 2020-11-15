import Debug from 'debug'
import fp from 'fastify-plugin'
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import { v4 as uuidv4 } from 'uuid'

import {
  CreateMountainCommand,
  CreateMountainCommandHandler,
} from './create-mountain.command'
import {
  DeleteMountainCommand,
  DeleteMountainCommandHandler,
} from './delete-mountain.command'
import {
  GetAllMountainsQuery,
  GetAllMountainsQueryHandler,
} from './get-all-mountains.query'
import {
  GetMountainQuery,
  GetMountainQueryHandler,
} from './get-mountain-by-id.query'
import { TaskRunner } from '../lib/task-runner.service'

const runner = new TaskRunner()
const debug = Debug('MountainController')

export const routes = fp(
  async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.get(
      '/mountain',
      async (request: FastifyRequest, reply: FastifyReply) => {
        debug('Create `getAllMountains` query and handler')
        const requestId = uuidv4()
        const query = GetAllMountainsQuery(requestId)
        const getAllMountainsHandler = new GetAllMountainsQueryHandler(query)

        debug('Delegate to task runner')
        // mind the 'await' here: the function (!) is suspended until the callback completes
        const result = await runner.run(getAllMountainsHandler)

        debug('Send response to client')
        return result
      }
    )

    fastify.get(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        debug('Create `getMountain` query and handler')
        const requestId = uuidv4()
        const name = (request.params as any).name as string
        const query = GetMountainQuery(requestId, name)
        const handler = new GetMountainQueryHandler(query)

        debug('Delegate to task runner')
        // mind the 'await' here: the function (!) is suspended until the callback completes
        const mountain = await runner.run(handler)

        debug('Send response to client')
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
        debug('Create `createMountain` command and handler')
        const requestId = uuidv4()
        const name = (request.body as any).name as string
        const command = CreateMountainCommand(requestId, name)
        const handler = new CreateMountainCommandHandler(command)

        debug('Delegate to task runner')
        // mind the missing `await` here: the function won't be suspended and flow of logic would just go on
        runner.run(handler)

        debug('Send response to client')
        // mind that the http code changed from `Created` to `Accepted`
        reply.code(202).header('content-type', 'application/json').send()
      }
    )

    fastify.delete(
      '/mountain/:name',
      async (request: FastifyRequest, reply: FastifyReply) => {
        debug('Create `deleteMountain` command and handler')
        const requestId = uuidv4()
        const name = (request.params as any).name as string
        const command = DeleteMountainCommand(requestId, name)
        const handler = new DeleteMountainCommandHandler(command)

        debug('Delegate to task runner')
        // mind the missing `await` here: the function won't be suspended and flow of logic would just go on
        runner.run(handler)

        debug('Send response to client')
        // mind that the http code changed from `Ok` to `Accepted`
        reply.code(202).header('content-type', 'application/json').send()
      }
    )
  }
)
