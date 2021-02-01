import {Framework} from '@roots/bud-framework'
import {isArray, isString} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## entry  [💁 Fluent]
     *
     * Define groups of files to be bundled together. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * app.entry('app', 'app.js')
     * ```
     *
     * ```js
     * app.entry('app', ['app.js', 'app.css'])
     * ```
     */
    entry: Framework.Api.Entry
  }

  namespace Framework.Api {
    export type Entry = (
      this: Framework,
      bundleName: string,
      assets:
        | string
        | string[]
        | {
            [key: string]: string | string[]
          },
    ) => Framework
  }
}

export const entry: Framework.Api.Entry = function (
  bundle,
  assets,
) {
  this.hooks.on('webpack.entry', entry => ({
    ...entry,
    ...(isString(assets) || isArray(assets)
      ? {[bundle]: assets}
      : assets),
  }))

  return this
}
