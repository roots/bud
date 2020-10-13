export const when: Api.When = function (
  test: boolean,
  trueCase?: CallableFunction,
  falseCase?: CallableFunction,
) {
  if (test === true) {
    trueCase && trueCase(this)
  } else if (test === false) {
    falseCase && falseCase(this)
  }

  return this
}
