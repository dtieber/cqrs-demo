import { Mountain } from './mountain.model'
import { mountains } from '../db/inmem-db'

export function getAll(): Mountain[] {
  return mountains
}

export function get(name: string): Mountain | undefined {
  return mountains.find((mountain) => mountain.name === name)
}

export function insert(name: string): boolean {
  if (get(name)) {
    return false
  }
  mountains.push({ name })
  return true
}

export function remove(name: string): boolean {
  const index = mountains.findIndex((mountain) => mountain.name === name)
  if (index !== -1) {
    mountains.splice(index, 1)
    return true
  }

  return false
}
