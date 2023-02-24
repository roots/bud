import {join} from 'node:path'

/**
 * @public
 */
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
  let value = this.hooks.filter(`build.output.publicPath`, ``)
  if (parts) value = join(value, ...parts)

  return value
}
