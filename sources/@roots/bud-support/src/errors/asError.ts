import {BudError} from './errors.js'

interface ErrorWithMessage extends Error {
  name: string
  message: string
}

export function isErrorWithMessage(
  error: unknown,
): error is ErrorWithMessage {
  return (
    typeof error === `object` &&
    error !== null &&
    `message` in error &&
    typeof (error as Record<string, unknown>).message === `string`
  )
}

export function asError(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) {
    return maybeError
  }

  return BudError.normalize(maybeError)
}
