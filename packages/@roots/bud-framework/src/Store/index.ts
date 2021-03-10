import Service from '../Service'
import {Store} from '@roots/bud-typings'

/**
 * Framework service
 */
export default class extends Service implements Store {
  /**
   * ## container.get
   *
   * Get a value from the container.
   *
   * If no key is passed the container store will be returned.
   *
   * ### Usage
   *
   * ```js
   * container.get('container.container-item')
   * ```
   *
   * ```js
   * container.get(['container', 'container-item'])
   * ```
   */
  public get<T = any>(path: Store.Keys) {
    return this._.get(this.repository, path) as T
  }
}
