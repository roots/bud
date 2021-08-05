import {isFunction} from 'lodash'

import {Framework} from '..'

interface get {
  (
    this: Framework,
    name: string,
    tap?: (app: Framework) => Framework,
  )
}

function get(
  this: Framework,
  name: string,
  tap?: (app: Framework) => Framework,
) {
  this.log('get request', name)

  const compiler = this.children.get(name)

  if (tap && isFunction(tap)) {
    tap(compiler)
  }

  return compiler
}

export {get}
