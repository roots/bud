import type {Bud, Build} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {isFunction} from 'lodash-es'

export default class Base implements Build.Base {
  /**
   * Application getter
   *
   * @readonly @public
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Constructor
   *
   * @public
   */
  public constructor(protected _app: () => Bud) {}

  @bind
  public wrap<T = any>(input: T | ((app: Bud) => T)): (app: Bud) => T {
    return isFunction(input) ? input : () => input
  }

  @bind
  public unwrap<T = any>(
    input: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T {
    return isFunction(input) ? input(this.app, ...options) : input
  }
}
