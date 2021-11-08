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
  const ctx = this as Framework

  ctx.access(test)
    ? trueCase && isFunction(trueCase) && ctx.tap(trueCase)
    : falseCase && isFunction(falseCase) && ctx.tap(falseCase)

  return ctx
}
