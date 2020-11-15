import { CommandHandler, TaskHandler } from './task.model'

function instanceOfCommandHandler(object: any): object is CommandHandler {
  return object?.runCommand
}

export class TaskRunner {
  async run(handler: TaskHandler): Promise<any> {
    if (instanceOfCommandHandler(handler)) {
      return handler.runCommand()
    } else {
      return handler.runQuery()
    }
  }
}
