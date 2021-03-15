import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## define  [💁 Fluent]
     *
     * Define application variables.
     *
     * ### Usage
     *
     * ```ts
     * app.define({
     *   APP_NAME: 'My Application',
     * })
     * ```
     */
    define: Framework.Api.Define
  }

  namespace Framework.Api {
    export {Define}
  }
}

type Define = (
  this: Framework,
  values: {[key: string]: Webpack.DefinePlugin.CodeValueObject},
) => Framework

export const define: Define = function (values) {
  this.publish({
    'extension/webpack-define-plugin/options': existant => ({
      ...existant,
      ...values,
    }),
  })

  return this
}
