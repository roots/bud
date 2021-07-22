import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import type {Options} from 'eslint-webpack-plugin'

import type {EslintConfig} from './interface'

export class Eslint implements EslintConfig {
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
