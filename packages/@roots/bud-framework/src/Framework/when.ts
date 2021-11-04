import type {Framework} from './'
import {isFunction} from './framework.dependencies'

interface when {
  (
    this: Framework,
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework
}

function when(
  this: Framework,
  test: ((app: Framework) => boolean) | boolean,
  trueCase: (app: Framework) => any,
  falseCase?: (app: Framework) => any,
): Framework {
  this.access(test)
    ? trueCase && isFunction(trueCase) && this.tap(trueCase)
    : falseCase && isFunction(falseCase) && this.tap(falseCase)

  return this
}

export {when}
