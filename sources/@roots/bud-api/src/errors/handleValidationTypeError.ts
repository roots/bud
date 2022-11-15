import type {Bud} from '@roots/bud-framework'

/**
 * Handle malformed input
 *
 * @public
 */
export function handleTypeError(
  bud: Bud,
  label: string,
  {error}: Zod.SafeParseError<any>,
): never {
  bud.api.logger.error(
    `\n\n`,
    label,
    `\n`,
    error
      .format()
      ._errors.filter(item => item.trim())
      .filter(item => item !== ``)
      .join(`\n`) ?? `type error`,
  )

  throw new TypeError()
}
