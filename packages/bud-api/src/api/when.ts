import {lodash as _} from '@roots/bud-support'

export const when: Framework.API.When = function (
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction,
) {
  _.isEqual(test, true)
    ? _.isFunction(trueCase) && trueCase(this)
    : _.isFunction(falseCase) && falseCase(this)

  return this
}
