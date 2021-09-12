import type {
  Configuration,
  Framework,
} from '@roots/bud-framework'

/**
 * Config function interface
 *
 * @privateRemarks Should this function be nixxed entirely?
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param overrides - {@link @roots/bud-framework#Configuration}
 *
 * @public @config
 */
interface config {
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
function config(overrides: Partial<Configuration>): Framework {
  if (!overrides)
    throw new Error('config() requires a config object')

  this.store.mergeStore(overrides)

  return this
}

export {config as default}
