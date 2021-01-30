import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework<T> {
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
    export type Define = (
      this: Framework,
      values: Webpack.DefinePlugin.CodeValueObject,
    ) => Framework
  }
}

export const define: Framework.Api.Define = function (values) {
  this.extensions
    .get('webpack-define-plugin')
    .merge('options', values)

  return this
}
