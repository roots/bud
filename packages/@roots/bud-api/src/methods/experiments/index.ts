import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack/types'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## experiments
     *
     * Configure experimental webpack options.
     *
     * ### Usage
     *
     * ```js
     * bud.experiments({
     *  lazyCompilation: true,
     * })
     * ```
     */
    experiments: Framework.Api.Experiments
  }

  namespace Framework.Api {
    type Experiments = (
      this: Framework,
      settings: Webpack.Configuration['experiments'],
    ) => Framework
  }
}

const experiments: Framework.Api.Experiments = function (
  settings,
) {
  this.hooks.on('build/experiments', settings)

  return this
}

export {experiments}
