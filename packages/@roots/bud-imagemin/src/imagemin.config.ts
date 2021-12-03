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
    this.app.info({
      message: 'bud.imagemin called',
      suffix: JSON.stringify(plugins),
    })

    const imagemin = this.app.extensions.get(
      'image-minimizer-webpack-plugin',
    )

    if (plugins && plugins.length) {
      imagemin.setOption('minimizerOptions.plugins', plugins)

      this.app.log({
        message: 'plugins',
        suffix: JSON.stringify(
          imagemin.getOption('minimizerOptions.plugins'),
        ),
      })
    }

    return this.app
  }
}
