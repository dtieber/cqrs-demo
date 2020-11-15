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

  constructor(task: GetAllMountainsQuery) {
    this.task = task
  }

  runQuery() {
    console.log('Get all mountains, request id: ', this.task.id)
    return Promise.resolve(mountainService.getAll())
  }
}
