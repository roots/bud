import type {Framework} from '@roots/bud-framework'
import Webpack from 'webpack'

export interface config {
  (overrides: Partial<Webpack.Configuration>): Framework
}

export function config(
  overrides: (
    config: Partial<Webpack.Configuration>,
  ) => Partial<Webpack.Configuration>,
): Framework {
  if (!overrides)
    throw new Error(
      'config overrides must pass a callback function that returns a webpack configuration',
    )

  this.hooks.on('event.build.override', overrides)

  return this
}
