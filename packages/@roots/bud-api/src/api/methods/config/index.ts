import type {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'

export interface config {
  (overrides: Partial<Webpack.Configuration>): Framework
}

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
