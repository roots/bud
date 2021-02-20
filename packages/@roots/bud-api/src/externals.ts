import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.externals  [💁 Fluent]
     *
     * Specify a non-standard resolution strategy for modules
     * with a matching name. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.externals({
     *   'jQuery': 'window.jquery',
     * })
     */
    externals: Framework.Api.Externals
  }

  namespace Framework.Api {
    export type Externals<T = Framework> = (
      this: Framework,
      externals: {
        [key: string]: any
      },
    ) => Framework
  }
}

export const externals: Framework.Api.Externals = function (
  externals,
) {
  this.hooks.on('webpack.externals', value => ({
    ...value,
    ...externals,
  }))

  return this
}
