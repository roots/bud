import type {Bud} from '@roots/bud-framework'

/**
 * Handle malformed input
 *
 * @public
 */
export function handleTypeError(
  _bud: Bud,
  label: string,
  {error}: Zod.SafeParseError<any>,
): never {
  const x = `\u2717`

  const err = new Error(
    error.issues
      .map(issue => `${x} ${label} -> ${issue.path}: ${issue.message}`)
      .join(`\n\n`)
      .concat(`\n`),
  )

  err.name = `Config error`
  throw err
}
