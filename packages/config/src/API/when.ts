export const when: API.When = function (
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction,
) {
  test === true && trueCase && trueCase(this)
  test === false && falseCase && falseCase(this)

  return this
}
