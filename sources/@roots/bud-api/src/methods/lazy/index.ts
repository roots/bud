import type {Bud} from '@roots/bud-framework'

export type Parameters = [any]

/**
 * Lazy function interface
 */
export interface lazy {
  (...parameters: Parameters): Bud
}

/**
 * Enables lazy compilation of built assets.
 *
 * @example
 * Enable:
 *
 * ```js
 * bud.lazy()
 * ```
 *
 * @example
 * Explicitly disable:
 *
 * ```js
 * bud.lazy(false)
 * ```
 *
 * @example
 * Explicitly enable:
 *
 * ```js
 * bud.lazy(true)
 * ```
 *
 * @example
 * Use with object options:
 *
 * ```js
 * bud.lazy({
 *   entries: false,
 *   imports: true,
 * })
 * ```
 */
export const lazy: lazy = function (this: Bud, value = true) {
  this.hooks.on(`build.experiments`, experiments => {
    if (!experiments) {
      return {lazyCompilation: value}
    }

    return {...experiments, lazyCompilation: value}
  })

  return this
}
