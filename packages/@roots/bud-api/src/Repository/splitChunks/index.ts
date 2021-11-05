import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import type {Configuration} from 'webpack'

import {splitChunksDefault} from './splitChunks.constant'

const {isUndefined} = lodash

export interface splitChunks {
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
export const splitChunks: splitChunks = function (
  options?: Configuration['optimization']['splitChunks'],
) {
  if (isUndefined(options) || options === true) {
    this.hooks.on(
      'build.optimizationsplitChunks',
      () => splitChunksDefault,
    )
    return this
  }

  if (options === false) {
    this.hooks.on(
      'build.optimizationsplitChunks',
      () => undefined,
    )
    return this
  }

  this.hooks.on('build.optimizationsplitChunks', () => options)

  return this
}
