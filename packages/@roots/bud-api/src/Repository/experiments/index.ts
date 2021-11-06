import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * @hook build.experiments
 *
 * @public @config
 */
export interface experiments {
  (
    key: keyof Configuration['experiments'],
    setting: boolean,
  ): Framework
}

/**
 * Configure experimental webpack options.
 *
 * @example
 * ```js
 * bud.experiments({
 *  lazyCompilation: true,
 * })
 * ```
 *
 * @public @config
 */
export const experiments: experiments = function (key, setting) {
  const ctx = this as Framework
  ctx.hooks.on('build.experiments', experiments => ({
    ...(experiments ?? {}),
    [key]: setting,
  }))

  return ctx
}
