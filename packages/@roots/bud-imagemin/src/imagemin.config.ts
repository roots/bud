import type {Framework} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'

export class Config {
  public _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  @bind
  public setPlugins(plugins: Array<[any, any]> | any) {
    plugins &&
      plugins.length &&
      this.app.extensions
        .get('image-minimizer-webpack-plugin')
        .setOptions('minimizerOptions.plugins', plugins)

    return this.app
  }
}
