import {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## define
     *
     * Define application variables.
     *
     * ### Usage
     *
     * ```ts file='bud.config.js'
     * app.define({
     *   APP_NAME: 'My Application',
     * })
     * ```
     */
    define: Framework.Api.Define
  }

  namespace Framework.Api {
    export type Define = (values: {
      [key: string]: Webpack.DefinePlugin['definitions']
    }) => Framework
  }
}

export const define: Framework.Api.Define = function (values) {
  this.hooks.on(
    'extension/webpack-define-plugin/options',
    (existantValues: Webpack.DefinePlugin['definitions']) => ({
      ...existantValues,
      ...values,
    }),
  )

  return this
}
