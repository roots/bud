import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Bud} from '@roots/bud-framework'
import {isFunction} from 'lodash-es'

import ReactRefreshExtension from './extension.js'
import * as reduceEntries from './reducers.js'

/**
 * Configure react-refresh-webpack-plugin
 *
 * @example
 * Add react-refresh-webpack-plugin
 *
 * ```ts
 * bud.reactRefresh(true)
 * ```
 *
 * @example
 * Remove react-refresh-webpack-plugin
 *
 * ```ts
 * bud.reactRefresh(false)
 * ```
 *
 * @example
 * Configure react-refresh-webpack-plugin
 *
 * ```ts
 * bud.reactRefresh({
 *   overlay: true,
 * })
 * ```
 *
 * @public
 */
export interface reactRefresh {
  (options?: ReactRefreshPluginOptions): Promise<Bud>
}

export interface reactRefresh {
  (options?: boolean): Promise<Bud>
}

export const reactRefresh: reactRefresh = async function (
  userOptions?: ReactRefreshPluginOptions | boolean,
) {
  const ctx = this as Bud

  if (
    userOptions === false &&
    ctx.extensions.has('@pmmmwh/react-refresh-webpack-plugin')
  ) {
    ctx.extensions.remove('@pmmmwh/react-refresh-webpack-plugin')
    ctx.hooks.on('build.entry', reduceEntries.remove)

    return ctx
  }

  /**
   * Add entries
   */
  ctx.hooks.on('build.entry', reduceEntries.add)
  await ctx.extensions.add(ReactRefreshExtension)

  if (!userOptions || userOptions === true) return ctx

  if (isFunction(userOptions)) {
    ctx.extensions
      .get('@pmmmwh/react-refresh-webpack-plugin')
      .setOptions(userOptions)

    return ctx
  }

  ctx.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .setOptions(options => ({...options, ...userOptions}))

  return ctx
}
