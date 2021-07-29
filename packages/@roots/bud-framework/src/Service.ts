/**
 * @module @roots/bud-framework
 */

import type {Framework} from './'
import {Bootstrapper} from './'

/**
 * @abstract Service
 *
 * Atomic unit of Framework functionality. Container instance.
 *
 * @noInheritDoc
 */
abstract class Service<T = any> extends Bootstrapper<T> {
  private _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    super()

    this._app = () => app
  }

  public bindMacro<
    T = {
      [key: string]: CallableFunction
    },
  >(properties: T): void {
    Object.assign(
      this.app,
      this.app
        .container<T>(properties)
        .getEntries()
        .reduce(
          (acc, [name, value]) => ({
            ...acc,
            [`${name}`]: value.bind(this.app),
          }),
          {},
        ),
    )
  }
}

export {Service}
