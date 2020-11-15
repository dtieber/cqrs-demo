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

  constructor(task: DeleteMountainCommand) {
    this.task = task
  }

  runCommand() {
    console.log(`Delete '${this.task.name}', request id: ${this.task.id}`)
    const deleted = mountainService.remove(this.task.name)
    if (deleted) {
      console.log(`Mountain deleted successfully, request id: ${this.task.id}`)
    } else {
      console.log(`Mountain was not deleted, request id: ${this.task.id}`)
    }
    return Promise.resolve()
  }
}
