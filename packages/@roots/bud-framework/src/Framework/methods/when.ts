import type {Framework} from '../'
import {isBoolean, isFunction} from '../framework.dependencies'

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
  const ctx = this as Framework

  const conditionalResult = ctx.maybeCall(test)

  if (!isBoolean(conditionalResult)) {
    ctx.error('[when] test must be a boolean or a function')
    throw new Error(conditionalResult)
  }

  this.maybeCall(test)
    ? trueCase && isFunction(trueCase) && trueCase(this)
    : falseCase && isFunction(falseCase) && falseCase(this)

  return this
}
