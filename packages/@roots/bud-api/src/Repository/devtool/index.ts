import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface devtool {
  (
    this: Framework,
    devtool?: Configuration['devtool'],
  ): Framework
}

/**
 * Configure sourcemaps
 *
 * @remarks
 * Compatible with any of [Webpack's devtool options](https://webpack.js.org/configuration/devtool/).
 *
 * @example
 * ```js
 * app.devtool('inline-cheap-module-source-map')
 * ```
 *
 * @public @config
 */
export const devtool: devtool = function (devtool = false) {
  this.hooks.on('build.devtool', () => devtool)

  this.api.log('success', {prefix: 'devtool', message: devtool})

  return this
}
