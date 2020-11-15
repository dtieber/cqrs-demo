import * as mountainService from './mountain.service'
import { CommandHandler, CommandTask } from '../lib/task.model'

export interface CreateMountainCommand extends CommandTask {
  id: string
  name: string
}

export const CreateMountainCommand = (
  id: string,
  name: string
): CreateMountainCommand => ({
  id,
  name,
})

export class CreateMountainCommandHandler implements CommandHandler {
  task: CreateMountainCommand

  constructor(task: CreateMountainCommand) {
    this.task = task
  }

  runCommand() {
    console.log(`Create '${this.task.name}', request id: ${this.task.id}`)
    const created = mountainService.insert(this.task.name)
    if (created) {
      console.log(`Mountain created successfully, request id: ${this.task.id}`)
    } else {
      console.log(`Mountain was not created, request id: ${this.task.id}`)
    }
    return Promise.resolve()
  }
}
