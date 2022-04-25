import {relative} from 'node:path'

import {Bud} from '..'

export interface relPath {
  (...parts: [string, string] | [string]): string
}

export const relPath: relPath = function (...parts): string {
  const app = this as Bud

  const processedParts: string[] = parts.map(part => app.path(part as any))

  return relative(
    processedParts?.length > 1 ? processedParts.shift() : app.path(),
    processedParts.shift(),
  )
}
