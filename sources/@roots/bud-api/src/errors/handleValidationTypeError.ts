import type {Bud} from '@roots/bud-framework'
import {InputError} from '@roots/bud-support/errors'

/**
 * Handle malformed input
 */
export function handleTypeError(
  _bud: Bud,
  label: string,
  {error}: Zod.SafeParseError<any>,
): never {
  throw new InputError(
    error.issues
      .map(issue => `${label} -> ${issue.path}: ${issue.message}`)
      .join(`\n\n`)
      .concat(`\n`),
  )
}
