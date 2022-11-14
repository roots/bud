import type {Bud} from '@roots/bud-framework'

/**
 * Handle malformed input
 *
 * @public
 */
export function handleTypeError(
  bud: Bud,
  {error}: Zod.SafeParseError<any>,
): never {
  bud.api.logger.error(
    `bud.alias`,
    `type error:`,
    error.format()._errors.join(` `),
  )

  throw new TypeError()
}
