import Debug from 'debug'

import * as mountainService from './mountain.service'
import { CommandHandler, CommandTask } from '../lib/task.model'

export interface DeleteMountainCommand extends CommandTask {
  id: string
  name: string
}

export const DeleteMountainCommand = (
  id: string,
  name: string
): DeleteMountainCommand => ({
  id,
  name,
})

export class DeleteMountainCommandHandler implements CommandHandler {
  task: DeleteMountainCommand
  logger

  constructor(task: DeleteMountainCommand) {
    this.task = task
    this.logger = Debug('DeleteMountainCommandHandler')
  }

  runCommand() {
    this.logger(`Delete '${this.task.name}', request id: ${this.task.id}`)
    const deleted = mountainService.remove(this.task.name)
    if (deleted) {
      this.logger(`Mountain deleted successfully, request id: ${this.task.id}`)
    } else {
      this.logger(`Mountain was not deleted, request id: ${this.task.id}`)
    }
    return Promise.resolve()
  }
}
