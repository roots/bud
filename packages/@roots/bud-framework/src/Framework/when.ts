import {isFunction} from 'lodash'

import type {Framework} from './'

interface when {
  (
    this: Framework,
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework
}

const when: when = function (test, trueCase, falseCase) {
  this.access(test)
    ? trueCase && isFunction(trueCase) && trueCase(this)
    : falseCase && isFunction(falseCase) && falseCase(this)

  return this
}

export {when}
