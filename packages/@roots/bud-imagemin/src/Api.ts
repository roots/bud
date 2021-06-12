import {Framework} from '@roots/bud-framework'
import {PluginOptions} from 'image-minimizer-webpack-plugin/types'

class Api {
  public _app: Framework['get']

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = app.get
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

export {Api}
