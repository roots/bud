import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## devtool  [💁 Fluent]
     *
     * Enable and configure sourcemaps using any of Webpack's
     * [devtool utilities](https://webpack.js.org/configuration/devtool/).
     *
     * ### Usage
     *
     * ```js
     * app.devtool('inline-cheap-module-source-map')
     * ```
     */
    alias: Framework.Api.Alias
  }

  export namespace Framework.Api {
    export type Devtool = (
      this: Framework,
      devtool?: Webpack.Configuration['devtool'],
    ) => Framework
  }
}

export const devtool: Framework.Api.Alias = function (devtool?) {
  this.options.enable('devtool')
  this.hooks.on('webpack.devtool', () => devtool ?? true)

  return this
}
