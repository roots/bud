import type {Framework} from '@roots/bud-framework'
import type Webpack from 'webpack'

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
    devtool: Api.Devtool
  }

  namespace Api {
    export {Devtool}
  }
}

type Devtool =
  | ((devtool?: Webpack.Configuration['devtool']) => Framework)
  | ((devtool?: Webpack.Configuration['devtool']) => Framework)

export const devtool: Devtool = function (devtool = false) {
  !this.store.has('args.devtool') &&
    this.store.set('options.devtool', devtool)

  return this
}
