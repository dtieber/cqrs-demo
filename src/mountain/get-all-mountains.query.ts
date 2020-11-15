import Debug from 'debug'

import * as mountainService from './mountain.service'
import { QueryHandler, QueryTask } from '../lib/task.model'

export interface GetAllMountainsQuery extends QueryTask {
  id: string
}

export const GetAllMountainsQuery = (id: string): GetAllMountainsQuery => ({
  id,
})

export class GetAllMountainsQueryHandler implements QueryHandler {
  task: GetAllMountainsQuery
  logger

  constructor(task: GetAllMountainsQuery) {
    this.task = task
    this.logger = Debug('GetAllMountainsQueryHandler')
  }

  runQuery() {
    this.logger('Get all mountains, request id: ', this.task.id)
    return Promise.resolve(mountainService.getAll())
  }
}
