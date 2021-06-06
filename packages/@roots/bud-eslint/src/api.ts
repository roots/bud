import {EslintConfig} from './interface'
import {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {Options} from 'eslint-webpack-plugin'

export class Eslint implements EslintConfig {
  public app: Framework['get']

  public constructor(app: Framework) {
    this.app = app.get
  }

  @bind
  public config(userOptions: Options): Framework {
    this.app().hooks.on(
      'extension/eslint-webpack-plugin/options',
      (options: Options) => ({
        ...options,
        ...userOptions,
      }),
    )

    return this.app()
  }
}
