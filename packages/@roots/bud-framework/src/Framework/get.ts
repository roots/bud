import {isFunction} from 'lodash'

import {Framework} from '..'

interface get {
  (
    this: Framework,
    name: string,
    tap?: (app: Framework) => Framework,
  ): Framework
}

interface get {
  (name: string, tap?: (app: Framework) => Framework): Framework
}

const get: get = function (
  name: string,
  tap?: (app: Framework) => Framework,
): Framework {
  this.log('get request', name)

  const instance = this.children.get(name)

  if (tap && isFunction(tap)) {
    tap(instance)
  }

  return instance
}

export {get}
