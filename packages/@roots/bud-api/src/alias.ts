declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## alias  [💁 Fluent]
     *
     * Register shorthand for resolving modules
     * using webpack aliases. Useful for
     * situations that may otherwise require
     * brittle relative paths. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * app.alias({
     *   '@scripts': app.src('scripts'),
     * })
     * ```
     */
    alias: Framework.Api.Alias
  }

  export namespace Framework.Api {
    export type Alias = (
      this: Framework,
      aliases: {
        [key: string]: string
      },
    ) => Framework
  }
}

import {Framework} from '@roots/bud-framework'

export const alias: Framework.Api.Alias = function (alias) {
  this.hooks.on('webpack.resolve.alias', aliases => ({
    ...aliases,
    ...alias,
  }))

  return this
}
