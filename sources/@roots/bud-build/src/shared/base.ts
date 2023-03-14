import type {Bud} from '@roots/bud-framework'
import type {Base as BuildBase} from '@roots/bud-framework/services/build'
import {bind} from '@roots/bud-support/decorators'
import isFunction from '@roots/bud-support/lodash/isFunction'

export default class Base implements BuildBase {
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
   */
  public constructor(public _app: () => Bud) {}

  @bind
  public wrap<T = any>(input: T | ((app: Bud) => T)): (app: Bud) => T {
    return isFunction(input) ? input : () => input
  }

  @bind
  public unwrap<T = any>(
    maybeFunction: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T {
    return isFunction(maybeFunction)
      ? maybeFunction(this.app, ...options)
      : maybeFunction
  }
}
