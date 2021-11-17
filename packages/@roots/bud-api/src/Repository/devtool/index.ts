import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export interface devtool {
  (devtool?: Configuration['devtool']): Promise<Framework>
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
export const devtool: devtool = async function (
  devtool = false,
) {
  this as Framework

  this.hooks.promise('build.devtool', async () => devtool)

  this.api.log('success', {prefix: 'devtool', message: devtool})

  return this
}
