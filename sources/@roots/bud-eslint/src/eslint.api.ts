import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import type {Options} from 'eslint-webpack-plugin'

export interface eslint {
  config(userOptions: Options): Bud
}

/**
 * @public
 */
export class eslint {
  /**
   * @internal
   */
  public _app: () => Bud

  /**
   * @internal
   */
  public get app() {
    return this._app()
  }

  /**
   * @internal
   */
  public constructor(app: Bud) {
    this._app = () => app
  }

  /**
   * @public
   */
  @bind
  public config(userOptions: Options): Bud {
    this.app.extensions.get('@roots/bud-eslint').setOptions(userOptions)

    this.app.info({
      message: 'overriding eslint by user configuration',
      value: userOptions,
    })

    return this.app
  }
}
