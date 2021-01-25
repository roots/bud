import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## bud.alias  [💁 Fluent]
     *
     * Register shorthand for resolving modules
     * using webpack aliases. Useful for
     * situations that may otherwise require
     * brittle relative paths. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.alias({
     *   '@scripts': bud.src('scripts'),
     * })
     * ```
     */
    alias: Framework.Api.Alias
  }

  namespace Framework.Api {
    export type Alias = (
      this: Framework,
      aliases: {
        [key: string]: string
      },
    ) => Framework
  }
}

export const alias: Framework.Api.Alias = function (alias) {
  this.hooks.on('webpack.resolve.alias', aliases => ({
    ...aliases,
    ...alias,
  }))

  return this
}
