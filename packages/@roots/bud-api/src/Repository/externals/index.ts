import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * Externals function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param externals - {@link webpack#Configuration.externals}
 *
 * @hook build.externals
 *
 * @public @config
 */
export interface externals {
  (externals: Configuration['externals']): Framework
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
export const externals: externals = function (externals) {
  const ctx = this as Framework

  ctx.hooks.on(
    'build.externals',
    (existant: Configuration['externals']) =>
      ({
        ...(existant as any),
        ...(externals as any),
      } as Configuration['externals']),
  )

  return ctx
}
