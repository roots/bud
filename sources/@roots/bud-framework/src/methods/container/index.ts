import * as Pkg from '@roots/container'

/**
 * container function interface
 */
export interface container<T = any> {
  <T>(repository?: T): Pkg.Container<T>
}

/**
 * Create a new container instance
 *
 * @example
 * ```js
 * const myContainer = bud.container({key: methods.'value'})
 *
 * myContainer.get('key') // returns 'value'
 * ```
 */
export const container: container = function <T = any>(
  repository?: T,
): Pkg.Container<T> {
  return repository
    ? new Pkg.Container<T>(repository)
    : new Pkg.Container()
}
