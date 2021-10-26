import type {Framework} from '@roots/bud-framework'
import type {PluginOptions} from 'image-minimizer-webpack-plugin/types'

export class Config {
  public _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  public plugins(plugins: Array<[string, any]>) {
    this.app.hooks.on(
      'extension/image-minimizer-webpack-plugin/options',
      (options: PluginOptions) => ({
        ...(options ?? {}),
        minimizerOptions: {
          ...(options.minimizerOptions ?? {}),
          plugins: [...plugins],
        },
      }),
    )

    return this.app
  }
}
