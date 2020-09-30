import Bud from '@roots/bud-types'

export const when: Bud.Config.When = function (
  this: Bud,
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction,
) {
  test === true && trueCase && trueCase(this)
  test === false && falseCase && falseCase(this)

  return this
}
