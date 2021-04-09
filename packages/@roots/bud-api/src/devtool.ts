import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

type Devtool = (
  this: Framework,
  devtool?: Webpack.Configuration['devtool'],
) => Framework

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## devtool [💁 Fluent]
     *
     * Enable and configure sourcemaps using any of [Webpack's
     * devtool utilities](https://webpack.js.org/configuration/devtool/).
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

export const devtool: Devtool = function (devtool = false) {
  !this.store.has('args.devtool') &&
    this.store.set('options.devtool', devtool)

  return this
}
