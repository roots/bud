import {join} from 'node:path'

import type {Bud} from '../bud.js'

export interface publicPath {
  (...parts: Array<string>): string
}

/**
 * Public path
 *
 * @remarks
 * Path from web root to assets
 */
export const publicPath: publicPath = function (...parts) {
  const ctx = this as Bud

  const basePath = ctx.hooks.filter(`build.output.publicPath`, `auto`)

  if (!parts.length) return basePath
  if (basePath !== `auto`) return join(basePath, ...parts)

  return join(...parts)
}
