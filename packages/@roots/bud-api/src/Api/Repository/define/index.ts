import type {Framework} from '@roots/bud-framework'
import type {DefinePlugin} from 'webpack'

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
 * @hook extension/webpack-define-plugin/options
 *
 * @public @config
 */
export function define(
  this: Framework,
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
