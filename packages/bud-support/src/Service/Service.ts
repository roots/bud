import {has} from 'lodash'

/**
 * Application service base
 */
export abstract class Service<T = any> {
  /**
   * Application reference
   */
  public readonly _app: () => T

  /**
   * Initialize class
   */
  public init(): void {
    return
  }

  /**
   * Constructor
   */
  public constructor(items?: {
    app: {get: () => T}
    [key: string]: any
  }) {
    this._app = items.app.get

    Object.entries(items)
      .filter(([key]) => {
        return key !== 'app'
      })
      .forEach(([key, value]) => {
        this[key] = value
      })

    this.init()
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
