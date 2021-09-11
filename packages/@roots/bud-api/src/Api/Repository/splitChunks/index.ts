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
interface splitChunks {
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
const splitChunks: splitChunks = function (options) {
  this.hooks.on(
    'build/optimization/splitChunks',
    options ?? this.store.get('build.optimization.splitChunks'),
  )

  return this
}

export {splitChunks as default}
