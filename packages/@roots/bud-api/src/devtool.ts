import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

type Devtool = (
  this: Framework,
  devtool?: Webpack.Configuration['devtool'],
) => Framework

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## devtool [💁 Fluent]
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
    devtool: Devtool
  }
}

export const devtool: Devtool = function (devtool?) {
  this.hooks.on('webpack.devtool', () => devtool ?? true)

  return this
}
