import type {Bud} from '@roots/bud-framework'
import {BudError, InputError} from '@roots/bud-support/errors'

/**
 * Handle malformed input
 */
export function handleTypeError(
  _bud: Bud,
  label: string,
  {error}: Zod.SafeParseError<any>,
): never {
  throw new InputError(`Invalid input in ${label}`, {
    props: {
      origin: BudError.normalize(error),
      details: error.issues
        .map(issue => `${label} -> ${issue.path}: ${issue.message}`)
        .join(`\n`),
      docs: new URL(`https://bud.js.org/docs/${label}`),
    },
  })
}
