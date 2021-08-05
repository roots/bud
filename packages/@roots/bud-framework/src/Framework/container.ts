import {Container} from '@roots/container'

import {Framework} from '.'

interface container<T = any> {
  (this: Framework, repository: T): Container<T>
}

function container<T = any>(repository?: T): Container<T> {
  return new Container<T>(repository)
}

export {container}
