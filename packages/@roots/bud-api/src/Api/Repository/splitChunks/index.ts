import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * Wrapper configuring {@link webpack#Configuration.optimization.splitChunks} settings
 *
 * @param this - {@link @roots/bud-framework#Framework | Framework instance}
 * @param options - {@link webpack#Configuration.optimization.splitChunks | webpack splitchunks options}
 *
 * @hook build/optimization/splitChunks
 *
 * @public @config
 */
export interface splitChunks {
  (
    this: Framework,
    options?: Configuration['optimization']['splitChunks'],
  ): Framework
}

/**
 * Bundle vendor modules separately from application code.
 *
 * @example
 * ```js
 * bud.splitChunks({
 *  chunks: 'all',
 * })
 * ```
 *
 * @public @config
 */
export const splitChunks: splitChunks = function (
  options?: Configuration['optimization']['splitChunks'],
) {
  const enabled = options !== false

  if (enabled === true) {
    this.store.set('splitChunks', true)
  }

  if (
    typeof options !== 'boolean' &&
    typeof options !== 'undefined'
  ) {
    this.store.set('build.optimization.splitChunks', options)
  }

  return this
}
