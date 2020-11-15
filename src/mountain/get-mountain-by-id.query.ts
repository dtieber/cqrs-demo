import * as mountainService from './mountain.service'
import { QueryHandler, QueryTask } from '../lib/task.model'

export interface GetMountainQuery extends QueryTask {
  id: string
  name: string
}

export const GetMountainQuery = (
  id: string,
  name: string
): GetMountainQuery => ({
  id,
  name,
})

export class GetMountainQueryHandler implements QueryHandler {
  task: GetMountainQuery

  constructor(task: GetMountainQuery) {
    this.task = task
  }

  runQuery() {
    console.log(`Get '${this.task.name}', request id: ${this.task.id}`)
    return Promise.resolve(mountainService.get(this.task.name))
  }
}
