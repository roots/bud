import {Container} from '@roots/container'

interface container<T = any> {
  <T>(repository?: T): Container<T>
}

const container = function <T = any>(
  repository?: T,
): Container<T> {
  return repository
    ? new Container<T>(repository)
    : new Container()
}

export {container}
