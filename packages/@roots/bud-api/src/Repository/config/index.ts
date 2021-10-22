import type {
  Configuration,
  Framework,
} from '@roots/bud-framework'

/**
 * @privateRemarks Should this function be nixxed entirely?
 */
export interface config {
  (this: Framework, overrides: Partial<Configuration>): Framework
}

/**
 * Modify the {@link Framework} baseline config.
 *
 * @remarks
 * Values defined in this function are more likely to be overwritten by {@link Framework} hooks, etc.
 * If there is a more direct way to make your change it is better to not use this function.
 *
 * Still, this function provides utility for certain use cases.
 *
 * @example
 * ```ts
 * app.config(config: Framework.Config)
 * ```
 *
 * @public
 */
export function config(
  this: Framework,
  overrides: Partial<Configuration>,
): Framework {
  if (!overrides)
    throw new Error('config() requires a config object')

  this.store.mergeStore(overrides)

  return this
}
