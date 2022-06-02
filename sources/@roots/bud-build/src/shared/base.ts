import type {Bud} from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {isFunction} from 'lodash-es'

export default class Base {
  /**
   * Application getter
   *
   * @readonly @public
   */
  public get app() {
    return this._app()
  }

  public constructor(public _app: () => Bud) {}

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
