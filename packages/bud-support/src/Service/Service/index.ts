import {has} from 'lodash'

/**
 * Application service base
 */
abstract class Service<T = any> {
  /**
   * Application reference
   */
  public readonly _app: () => T

  /**
   * Constructor
   */
  public constructor(items?: Service.ParameterItems<T>) {
    this._app = items.app.get

    Object.entries(items)
      .filter(([key]) => {
        return key !== 'app'
      })
      .forEach(([key, value]) => {
        this[key] = value
      })

    this.init && this.init()
  }

  /**
   * Application accessor
   */
  public get app(): T {
    return this._app()
  }

  /**
   * Has prop?
   */
  public hasProp = function (name: string): boolean {
    return has(this, name)
  }
}

interface Service<T = any> {
  /**
   * Application reference
   */
  app: T

  /**
   * Initializer.
   */
  init?(): void

  /**
   * Has prop?
   */
  hasProp: (name: string) => boolean
}

/**
 * Application service namespace
 */
namespace Service {
  export interface ParameterItems<T = any> {
    app: {get: () => T}
    [key: string]: any
  }
}

export {Service}
