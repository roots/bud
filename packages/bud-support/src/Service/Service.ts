import {Container} from '@roots/container'

/**
 * Application service base
 */
export abstract class Service<T = any> {
  [key: string]: any

  /**
   * Application reference
   */
  public readonly _app: () => T

  /**
   * Constructor
   */
  public constructor(
    get: () => T,
    containers?: {[key: string]: Container['repository']},
    theRest?: {[key: string]: any},
  ) {
    this._app = get

    containers &&
      Object.entries(containers).forEach(
        ([name, repo]: [
          string,
          {[key: string]: Container['repository']},
        ]) => (this[name] = new Container(repo)),
      )

    theRest &&
      Object.entries(theRest).forEach(([key, value]) => {
        this[key] = value
      })
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
