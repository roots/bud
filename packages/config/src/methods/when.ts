import {Config} from '..'

export const when: Config.When = function (
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction,
) {
  test === true && trueCase && trueCase(this)
  test === false && falseCase && falseCase(this)

  return this
}
