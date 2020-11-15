export interface CommandTask {
  id: String
}

export interface QueryTask {
  id: String
}

export type Task = CommandTask | QueryTask

export interface CommandHandler {
  task: CommandTask
  runCommand(): Promise<void>
}

export interface QueryHandler {
  task: QueryTask
  runQuery(): Promise<any>
}

export type TaskHandler = CommandHandler | QueryHandler
