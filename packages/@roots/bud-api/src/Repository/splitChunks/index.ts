import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import type {Configuration} from 'webpack'

import {splitChunksDefault} from './splitChunks.constant'

const {isUndefined} = lodash

export interface splitChunks {
  (
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
  const ctx = this as Framework

  if (isUndefined(options) || options === true) {
    ctx.hooks.on(
      'build.optimization.splitChunks',
      () => splitChunksDefault,
    )
    return ctx
  }

  if (options === false) {
    ctx.hooks.on(
      'build.optimization.splitChunks',
      () => undefined,
    )
    return ctx
  }

  ctx.hooks.on('build.optimization.splitChunks', () => options)

  return ctx
}
