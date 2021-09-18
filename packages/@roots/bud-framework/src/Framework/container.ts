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
 * Instantiates and returns a new {@link @roots/container#Container | Container}
 *
 * @public
 */
export const container = function <T = any>(
  repository?: T,
): Container<T> {
  return repository
    ? new Container<T>(repository)
    : new Container()
}
