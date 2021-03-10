import {Framework} from '@roots/bud-framework'
import {isNull, Webpack} from '@roots/bud-support'
import {isBoolean} from 'lodash'

type Devtool = (
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

const DEFAULT_SOURCEMAP_TOOL_DEV = 'eval-cheap-module-source-map'

const DEFAULT_SOURCEMAP_TOOL_PROD = 'nosources-source-map'

export const devtool: Devtool = function (devtool = null) {
  if (isNull(devtool)) {
    this.store.set(
      'options.devtool',
      this.isDevelopment
        ? DEFAULT_SOURCEMAP_TOOL_DEV
        : DEFAULT_SOURCEMAP_TOOL_PROD,
    )

    return this
  }

  if (isBoolean(devtool)) {
    this.store.set('options.devtool', devtool)
    return this
  }

  this.store.set('options.devtool', devtool)

  return this
}
