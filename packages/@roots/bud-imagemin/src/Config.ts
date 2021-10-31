import type {Framework} from '@roots/bud-framework'

export class Config {
  public _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  public plugins(plugins: Array<[string, any]>) {
    this.app.extensions
      .get('image-minimizer-webpack-plugin')
      .options.merge({plugins}, 'minimizerOptions')

    return this.app
  }
}
