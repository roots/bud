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
  const ctx = this as Framework

  if (!overrides)
    throw new Error(
      'config overrides must pass a callback function that returns a webpack configuration',
    )

  ctx.hooks.action('event.build.after', async app => {
    app.build.config = overrides(app.build.config)
  })

  return ctx
}
