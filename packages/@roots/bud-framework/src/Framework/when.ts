import type {Framework} from './'
import {isFunction} from './framework.dependencies'

export interface when {
  (
    test: ((app: Framework) => boolean) | boolean,
    trueCase: (app: Framework) => any,
    falseCase?: (app: Framework) => any,
  ): Framework
}

export function when(
  test: ((app: Framework) => boolean) | boolean,
  trueCase: (app: Framework) => any,
  falseCase?: (app: Framework) => any,
): Framework {
  this as Framework

  this.maybeCall(test)
    ? trueCase && isFunction(trueCase) && trueCase(this)
    : falseCase && isFunction(falseCase) && trueCase(this)

  return this
}
