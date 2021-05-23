import type {Api} from '@roots/bud-framework'
import type Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## override
     *
     * Modify the final webpack configuration. This is the last
     * chance to make amendments before compilation.
     *
     * ### Usage
     *
     * ```js
     * app.override(webpackConfig => ({
     *   ...webpackConfig,
     * }))
     * ```
     */
    override: Api.Override
  }

  namespace Api {
    type Override = (
      overrideFn: (
        config: Webpack.Configuration,
      ) => Webpack.Configuration,
    ) => Framework
  }
}

const override: Api.Override = function (overrideFn) {
  this.hooks.on('after', (config: Webpack.Configuration) =>
    overrideFn(config),
  )

  return this
}

export {override}
