import type {Framework} from '../'

/**
 * @public
 */
export interface publicPath {
  (): string
}

/**
 * @public
 */
export const publicPath: publicPath = function (): string {
  const ctx = this as Framework

  const value = ctx.hooks.filter('build.output.publicPath')

  return value
}
