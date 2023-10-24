import type {Bud} from '@roots/bud-framework'
import type {LazyCompilationOptions} from '@roots/bud-framework'

export type Parameters = [boolean | LazyCompilationOptions]

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
  if (typeof value === `boolean`) {
    this.hooks.on(`build.experiments`, experiments => ({
      ...(experiments ?? {}),
      lazyCompilation: value,
    }))
    return this
  }

  this.hooks.on(`build.experiments`, experiments => {
    if (
      typeof experiments?.lazyCompilation === `boolean` ||
      !experiments?.lazyCompilation
    )
      return {...(experiments ?? {}), lazyCompilation: value}

    experiments.lazyCompilation = {
      ...experiments.lazyCompilation,
      ...value,
    }

    return experiments
  })

  return this
}
