import type {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import type {Options} from 'eslint-webpack-plugin'

interface EslintConfig {
  config(userOptions: Options): Framework
}

class EslintConfig {
  public _app: () => Framework

  public get app() {
    return this._app()
  }

  public constructor(app: Framework) {
    this._app = () => app
  }

  @bind
  public config(userOptions: Options): Framework {
    this.app.hooks.on(
      'extension/eslint-webpack-plugin/options',
      (options: Options) => ({
        ...options,
        ...userOptions,
      }),
    )

    return this.app
  }
}

export {EslintConfig}
