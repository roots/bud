import type {Bud} from '@roots/bud-framework'
import type {Base as BuildBase} from '@roots/bud-framework/services/build'

import {bind} from '@roots/bud-support/decorators/bind'
import isFunction from '@roots/bud-support/lodash/isFunction'

export default class Base implements BuildBase {
  /**
   * Constructor
   */
  public constructor(public _app: () => Bud) {}

  /**
   * Application getter
   *
   * @readonly @public
   */
  public get app(): Bud {
    return this._app()
  }

  @bind
  public unwrap<T = any>(
    maybeFunction: ((app: Bud, ...options: Array<any>) => T) | T,
    ...options: Array<any>
  ): T {
    return isFunction(maybeFunction)
      ? maybeFunction(this.app, ...options)
      : maybeFunction
  }

  @bind
  public wrap<T = any>(input: ((app: Bud) => T) | T): (app: Bud) => T {
    return isFunction(input) ? input : () => input
  }
}
