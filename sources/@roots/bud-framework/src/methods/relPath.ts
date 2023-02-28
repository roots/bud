import {relative} from 'node:path'

export interface relPath {
  (...parts: Array<string>): string
}

export const relPath: relPath = function (...parts): string {
  return relative(this.path(), this.path(...parts))
}
