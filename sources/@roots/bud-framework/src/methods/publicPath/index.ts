import {join} from 'node:path'

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
  const basePath = this.hooks.filter(`build.output.publicPath`, `auto`)

  if (!parts.length) return basePath
  if (basePath !== `auto`) return join(basePath, ...parts)

  return join(...parts)
}
