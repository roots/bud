import {Container} from '@roots/container'

/**
 * Application service base
 */
export abstract class Service<T = any> extends Container {
  [key: string]: any

  /**
   * Application reference
   */
  public readonly _app: () => T

  /**
   * Constructor
   */
  public constructor(get: () => T) {
    super()

    this._app = get
  }

  /**
   * Register service
   */
  public register(): void {
    return
  }

  /**
   * Boot service
   */
  public boot(): void {
    return
  }

  /**
   * Application accessor
   */
  public get app(): T {
    return this._app()
  }
}
