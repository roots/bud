import {Container} from '@roots/container'
import {has} from 'lodash'

/**
 * Application service base
 */
abstract class ServiceContainer<
  T = ServiceContainer.Application<any>
> extends Container {
  /**
   * Application reference
   */
  public readonly _app: ServiceContainer.Ref<T>

  /**
   * Constructor
   */
  public constructor(items: ServiceContainer.ParameterItems) {
    super({})

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

interface ServiceContainer<T = ServiceContainer.Application> {
  /**
   * Application ref.
   */
  readonly _app: ServiceContainer.Ref<T>

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
namespace ServiceContainer {
  export interface ParameterItems<T = any> {
    app: T
    [key: string]: any
  }

  export type Ref<T = any> = () => T

  export interface Application<T = any> {
    get(): T
  }
}

export default ServiceContainer
