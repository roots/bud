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

  this.access(test)
    ? trueCase && isFunction(trueCase) && this.tap(trueCase)
    : falseCase && isFunction(falseCase) && this.tap(falseCase)

  return this
}
