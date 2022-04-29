import type {Bud} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import * as defaultGroups from './groups'
import {method} from './splitChunks.interface'

const {isUndefined} = lodash

/**
 * Bundle vendor modules separately from application code.
 *
 * @example
 * Enable chunk splitting
 *
 * ```js
 * bud.splitChunks()
 * ```
 *
 * @example
 * Disable chunk splitting
 *
 * ```js
 * bud.splitChunks(false)
 * ```
 *
 * @example
 * Merge optimization.splitChunks object
 *
 * ```js
 * bud.splitChunks({chunks: 'all'})
 * ```
 *
 * @public
 */
export const splitChunks: method = function (options) {
  const ctx = this as Bud

  /**
   * For `true` and `undefined` options the default
   * cache groups are added to the build
   */
  if (isUndefined(options) || options === true) {
    ctx.hooks.on(
      'build.optimization.splitChunks',
      splitChunksFilterValue => ({
        ...(splitChunksFilterValue ?? {}),
        cacheGroups: {
          ...(splitChunksFilterValue?.cacheGroups ?? {}),
          ...defaultGroups,
        },
      }),
    )

    return ctx
  }

  /**
   * A `false` value indicates that the user wishes to
   * disable chunking. Passing `undefined` to a `build.` hook
   * will omit it from the configuration entirely.
   */
  if (options === false) {
    ctx.hooks.on('build.optimization.splitChunks', undefined)

    return ctx
  }

  /**
   * The remaining possibilty is an options object.
   *
   * In this case the passed options are spread onto the existing ones.
   *
   * For deeper merging the user can call `build.optimization.splitChunks`
   * hook themselves.
   */
  ctx.hooks.on(
    'build.optimization.splitChunks',
    splitChunksFilterValue => ({
      ...(splitChunksFilterValue ?? {}),
      ...(options ?? {}),
      cacheGroups: {
        ...(splitChunksFilterValue?.cacheGroups ?? {}),
        ...defaultGroups,
        ...(options.cacheGroups ?? {}),
      },
    }),
  )

  return ctx
}
