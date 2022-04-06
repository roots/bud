import {lodash} from '@roots/bud-support'

import type {Bud} from '../'

const {isFunction, isBoolean} = lodash

export interface when {
  (
    test: ((app: Bud) => boolean) | boolean,
    trueCase: (app: Bud) => any,
    falseCase?: (app: Bud) => any,
  ): Bud
}

export function when(
  test: ((app: Bud) => boolean) | boolean,
  trueCase: (app: Bud) => any,
  falseCase?: (app: Bud) => any,
): Bud {
  const ctx = this as Bud

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
