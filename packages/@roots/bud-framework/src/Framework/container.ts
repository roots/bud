import {Container} from '@roots/container'

/**
 * container function interface
 *
 * @internal
 */
interface container<T = any> {
  <T>(repository?: T): Container<T>
}

/**
 * Instantiates and returns a new {@link @roots/container#Container | Container}
 *
 * @public
 */
const container = function <T = any>(
  repository?: T,
): Container<T> {
  return repository
    ? new Container<T>(repository)
    : new Container()
}

export {container}
