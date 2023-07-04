import type {Bud} from '@roots/bud-framework'
import type {Optimization} from '@roots/bud-framework/config'

import {join, sep} from 'node:path'

import isUndefined from '@roots/bud-support/lodash/isUndefined'

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
export const splitChunks: splitChunks = async function (this: Bud, value) {
  /**
   * For `true` and `undefined` options the default
   * cache groups are added to the build
   */
  if (isUndefined(value) || value === true) {
    this.hooks.on(`build.optimization.splitChunks`, (options = {}) => {
      if (options === false) options = {}

      return {
        automaticNameDelimiter: sep,
        ...options,
        cacheGroups: {
          ...(options.cacheGroups ?? {}),
          default: false,
          vendor: {
            chunks: `all`,
            enforce: true,
            filename: join(`js`, `bundle`, `[name].js`),
            idHint: `vendor`,
            name: `vendor`,
            priority: -20,
            test: /[\\/]node_modules[\\/]/,
          },
        },
      }
    })

    return this
  }

  /**
   * Otherwise we just pass the value through
   */
  this.hooks.on(`build.optimization.splitChunks`, value)

  return this
}
