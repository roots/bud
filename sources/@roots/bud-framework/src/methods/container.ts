import {Container} from '@roots/container'

/**
 * container function interface
 *
 * @internal
 */
export interface container<T = any> {
  <T>(repository?: T): Container<T>
}

/**
 * Create a new {@link Container} instance
 *
 * @example
 * ```js
 * const myContainer = bud.container({key: methods.'value'})
 *
 * myContainer.get('key') // returns 'value'
 * ```
 *
 * @public
 */
export const container = function <T = any>(repository?: T): Container<T> {
  return repository ? new Container<T>(repository) : new Container()
}
