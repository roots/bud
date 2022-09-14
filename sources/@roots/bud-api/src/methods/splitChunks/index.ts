import type {Bud} from '@roots/bud-framework'
import {isUndefined} from '@roots/bud-support/lodash-es'
import type {Configuration} from 'webpack'

export interface method {
  (options?: Configuration['optimization']['splitChunks']): Bud
}

export interface facade {
  (options?: Configuration['optimization']['splitChunks']): Bud
}

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
export const method: method = function (options) {
  const ctx = this as Bud

  /**
   * A `false` value indicates that the user wishes to
   * disable chunking. Passing `undefined` to a `build.` hook
   * will omit it from the configuration entirely.
   */
  if (options === false) {
    ctx.hooks.on(`build.optimization.splitChunks`, () => false)
    return ctx
  }

  /**
   * For `true` and `undefined` options the default
   * cache groups are added to the build
   */
  if (options === true || isUndefined(options)) {
    ctx.hooks.on(`build.optimization.splitChunks`, () => ({
      chunks: `all`,
      automaticNameDelimiter: `/`,
      minSize: 0,
      cacheGroups: {
        vendor: {
          idHint: `vendor`,
          filename: `js/bundle/vendor/[name].js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    }))

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
  ctx.hooks.on(`build.optimization.splitChunks`, options)
  return ctx
}
