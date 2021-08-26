import type {
  Configuration,
  Framework,
} from '@roots/bud-framework'

/**
 * Modify the {@link Framework} baseline config.
 *
 * @remarks
 *
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
 * @return {ThisParameterType<typeof Framework>} The modified {@link Framework} instance.
 */
interface config {
  (
    /**
     * @param {Framework} framework - The framework instance.
     */
    this: Framework,

    /**
     * @param {Configuration} config - The framework configuration.
     */
    overrides: Partial<Configuration>,
  ): Framework
}

const config: config = function (
  overrides: Partial<Configuration>,
): Framework {
  /**
   * If no `overrides` are provided throw an error.
   */
  if (!overrides) {
    throw new Error('config() requires a config object')
  }

  /**
   * Merge {@link Framework['store']['repository'] the Framework repository} with the `overrides`
   */
  this.store.mergeStore(overrides)

  /**
   * Returns the {@link Framework} instance.
   */
  return this
}

export {config}
