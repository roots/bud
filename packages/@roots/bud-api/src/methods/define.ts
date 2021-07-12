import type {Framework} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

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
    type Define = (
      this: Framework,
      values: DefinePlugin['definitions'],
    ) => Framework
  }
}

export const define: Framework.Api.Define = function (values) {
  this.hooks.on(
    'extension/webpack-define-plugin/options',
    (existant: DefinePlugin['definitions']) => ({
      ...existant,
      ...values,
    }),
  )

  return this
}
