/**
 * @module @roots/bud-imagemin
 */

import type {Framework} from '@roots/bud-framework'
import type {PluginOptions} from 'image-minimizer-webpack-plugin/types'

/**
 * @class Config
 */
class Config {
  public _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  public plugins(plugins: [string, any]) {
    this.app.hooks.on(
      'extension/image-minimizer-webpack-plugin/options',
      (options: PluginOptions) => ({
        ...(options ?? {}),
        minimizerOptions: {
          ...(options.minimizerOptions ?? {}),
          plugins,
        },
      }),
    )

    return this.app
  }
}

/**
 * @exports Config
 */
export {Config}
