import type {Bud} from '@roots/bud-framework'
import type {Optimization} from '@roots/bud-framework/config'

import isUndefined from '@roots/bud-support/lodash/isUndefined'
import {join, sep} from 'node:path'

export type Parameters = [
  (
    | ((
        splitChunks: false | Optimization.SplitChunks | undefined,
      ) => false | Optimization.SplitChunks)
    | boolean
    | Optimization.SplitChunks
  )?,
]

export interface splitChunks {
  (...parameters: Parameters): Promise<Bud>
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
 */
export const splitChunks: splitChunks = async function (
  this: Bud,
  options,
) {
  /**
   * For `true` and `undefined` options the default
   * cache groups are added to the build
   */
  if (options === true || isUndefined(options)) {
    this.hooks.on(`build.optimization.splitChunks`, {
      automaticNameDelimiter: sep,
      cacheGroups: {
        vendor: {
          filename: join(`js`, `bundle`, `vendor`, `[name].js`),
          idHint: `vendor`,
          priority: -20,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: `all`,
      minSize: 0,
    })

    return this
  }

  /**
   * Otherwise we just pass the options through
   */
  this.hooks.on(`build.optimization.splitChunks`, options)

  return this
}
