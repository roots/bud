import type {Bud} from '@roots/bud-framework'
import {InputError} from '@roots/bud-support/errors'
import figures from '@roots/bud-support/figures'

/**
 * Handle malformed input
 */
export function handleTypeError(
  _bud: Bud,
  label: string,
  {error}: Zod.SafeParseError<any>,
): never {
  throw new InputError(
    `${label}: `.concat(
      error.issues
        .map(
          issue => `${issue.path} ${figures.arrowRight} ${issue.message}`,
        )
        .join(`\n`),
    ),
    {
      props: {
        thrownBy: label,
        docs: new URL(`https://bud.js.org/docs/${label}`),
      },
    },
  )
}
