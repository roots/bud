import type {Framework} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

/**
 * Function accepting {@link webpack#DefinePlugin} definitions and
 * returning the {@link @roots/bud-framework#Framework}
 *
 * @param values - {@link webpack#DefinePlugin} definitions
 * @returns {@link @roots/bud-framework#Framework}
 *
 * @public @config
 */
export interface define {
  (
    this: Framework,
    values: DefinePlugin['definitions'],
  ): Framework
}

/**
 * Define application variables
 *
 * @example
 * ```ts
 * app.define({
 *   APP_NAME: 'My Application',
 * })
 * ```
 *
 * @public @config
 */
export const define: define = function (
  values: DefinePlugin['definitions'],
): Framework {
  this.hooks.on(
    'extension/webpack-define-plugin/options',
    (existant: DefinePlugin['definitions']) => ({
      ...existant,
      ...values,
    }),
  )

  return this
}
