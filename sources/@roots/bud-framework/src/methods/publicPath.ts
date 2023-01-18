import type {Bud} from '../bud.js'

/**
 * @public
 */
export interface publicPath {
  (): string
}

/**
 * Public path
 *
 * @remarks
 * Path from web root to assets
 */
export const publicPath: publicPath = function (): string {
  const ctx = this as Bud

  const value = ctx.hooks.filter(`build.output.publicPath`)

  return value
}
