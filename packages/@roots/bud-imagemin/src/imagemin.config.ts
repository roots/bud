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
    this.app.info('bud.imagemin called')

    const imagemin = this.app.extensions.get(
      'image-minimizer-webpack-plugin',
    )
    if (plugins && plugins.length && imagemin?.options)
      imagemin.options.merge('minimizerOptions.plugins', plugins)

    return this.app
  }
}
