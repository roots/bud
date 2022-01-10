import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'
import type {Configuration} from 'webpack'

import {
  budChunk,
  splitChunksDefault,
} from './splitChunks.constant'

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
 * @public
 */
export const splitChunks: splitChunks = function (
  options?: Configuration['optimization']['splitChunks'],
) {
  const ctx = this as Framework

  if (isUndefined(options) || options === true) {
    ctx.hooks.on<'build.optimization.splitChunks'>(
      'build.optimization.splitChunks',
      splitChunks => ({
        ...(splitChunks ?? {}),
        cacheGroups: {
          ...(splitChunksDefault.cacheGroups ?? {}),
          bud: budChunk,
        },
      }),
    )
    return ctx
  }

  if (options === false) {
    ctx.hooks.on(
      'build.optimization.splitChunks',
      _splitChunks => undefined,
    )

    return ctx
  }

  ctx.hooks.on(
    'build.optimization.splitChunks',
    _splitChunks => ({
      ...(options ?? {}),
      cacheGroups: {
        ...(options.cacheGroups ?? {}),
        bud: budChunk,
      },
    }),
  )

  return ctx
}
