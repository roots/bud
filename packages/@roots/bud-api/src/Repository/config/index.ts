import type {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'

/**
 * @privateRemarks Should this function be nixxed entirely?
 */
export interface config {
  (overrides: Partial<Webpack.Configuration>): Framework
}

/**
 * Modify the {@link Framework} baseline config.
 *
 * @remarks
 * Override generated webpack config with custom config.
 *
 * @example
 * ```ts
 * app.config({entry: './src/index.js'})
 * ```
 *
 * @public
 */
export function config(
  overrides: Partial<Webpack.Configuration>,
): Framework {
  if (!overrides)
    throw new Error('config() requires a config object')

  this.hooks.on('config.override', config => ({
    ...config,
    ...overrides,
  }))

  return this
}
