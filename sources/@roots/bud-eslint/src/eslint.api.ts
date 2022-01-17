import type {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import type {Options} from 'eslint-webpack-plugin'

export interface eslint {
  config(userOptions: Options): Framework
}

/**
 * @public
 */
export class eslint {
  /**
   * @internal
   */
  public _app: () => Framework

  /**
   * @internal
   */
  public get app() {
    return this._app()
  }

  /**
   * @internal
   */
  public constructor(app: Framework) {
    this._app = () => app
  }

  /**
   * @public
   */
  @bind
  public config(userOptions: Options): Framework {
    this.app.extensions
      .get('eslint-webpack-plugin')
      .setOptions(userOptions)

    this.app.info({
      message: 'overriding eslint by user configuration',
      value: userOptions,
    })

    return this.app
  }
}
