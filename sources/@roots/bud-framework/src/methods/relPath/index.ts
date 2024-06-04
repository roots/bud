import type {Bud} from '@roots/bud-framework'

import {isAbsolute, relative} from 'node:path'

/**
 * ## bud.relPath
 */
export interface relPath {
  (...segments: Array<string>): string
}

export const relPath: relPath = function (...segments) {
  const app = this as Bud

  /* Exit early with context.basedir if no path was passed */
  if (!segments?.length) return ``

  const value = app.path(...segments)

  return isAbsolute(value) ? relative(app.context.basedir, value) : value
}
