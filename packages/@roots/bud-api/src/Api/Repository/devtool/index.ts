import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * {@link devtool | devtool function} interface
 *
 * @hook build/devtool
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param devtool - {@link webpack#Configuration.devtool}
 *
 * @public @config
 */
interface devtool {
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
const devtool: devtool = function (devtool = false) {
  this.hooks.on('build/devtool', () => devtool)

  return this
}

export {devtool as default}
