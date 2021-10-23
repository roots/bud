import type {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import type {Options} from 'eslint-webpack-plugin'

export interface EslintConfig {
  config(userOptions: Options): Framework
}

/**
 * @public
 */
export class EslintConfig {
  /**
   * @internal
   */
  public _app: () => Framework

  /**
   * @public
   */
  public get app() {
    return this._app()
  }

  /**
   * @public
   */
  public constructor(app: Framework) {
    this._app = () => app
  }

  /**
   * @public
   */
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
