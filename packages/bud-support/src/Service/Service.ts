import {has, isEqual} from 'lodash'
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
  public constructor(items: {
    [key: string]: any
    app: T
    containers?: {[key: string]: Container['repository']}
  }) {
    this._app = () => items.app

    if (items.containers) {
      Object.entries(items.containers).forEach(
        ([name, repo]: [
          string,
          {[key: string]: Container['repository']},
        ]) => (this[name] = new Container(repo)),
      )
    }

    Object.entries(items)
      .filter(([key]: [string, any]) => {
        return (
          !isEqual(key, 'app') && !isEqual(key, 'containers')
        )
      })
      .forEach(([key, value]) => {
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

  /**
   * Has prop?
   */
  public hasProp = function (name: string): boolean {
    return has(this, name)
  }
}
