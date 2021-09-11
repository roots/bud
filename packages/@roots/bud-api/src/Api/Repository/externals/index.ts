import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * Externals function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param externals - {@link webpack#Configuration.externals}
 *
 * @hook build/externals
 *
 * @public @config
 */
interface externals {
  (
    this: Framework,
    externals: Configuration['externals'],
  ): Framework
}

/**
 * Specify a non-standard resolution strategy for modules with a matching name.
 *
 * @example
 * ```js
 * bud.externals({
 *   'jQuery': 'window.jquery',
 * })
 * ```
 *
 * @public @config
 */
const externals: externals = function (externals) {
  this.hooks.on(
    'build/externals',
    (existant: Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Configuration['externals']),
  )

  return this
}

export {externals as default}
