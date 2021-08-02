/**
 * @module @roots/bud-framework
 */

import {isArray} from 'lodash'
import type {Class} from 'type-fest'

import type {Framework} from './'
import {Bootstrapper} from './'

/**
 * Framework Service
 *
 * Atomic unit of Framework functionality. Container instance.
 *
 * @noInheritDoc
 */
abstract class Service<T = any> extends Bootstrapper<T> {
  /**
   * @constructor Class constructor
   */
  public constructor(app: Framework) {
    super(app)
  }

  /**
   * @method bindMacro
   *
   * Bind a callable function to the Framework
   */
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
        .reduce((acc, [name, value]) => {
          return {...acc, [`${name}`]: value.bind(this.app)}
        }, {}),
    )
  }

  /**
   * @method bindClass
   *
   * Bind a class to the Framework
   */
  public bindClass<
    T = {
      [key: string]: Class | [Class, any[]]
    },
  >(properties: T): void {
    Object.assign(
      this.app,
      this.app
        .container<T>(properties)
        .getEntries()
        .reduce((acc, [name, value]) => {
          const [ClassObj, constructorParams] = isArray(value)
            ? value
            : [value, []]

          return {
            ...acc,
            [`${name}`]: new ClassObj(
              ...(isArray(constructorParams)
                ? constructorParams
                : [constructorParams]),
            ),
          }
        }, {}),
    )
  }
}

export {Service}
