import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Framework} from '@roots/bud-framework'
import {isFunction} from 'lodash'

import {ReactRefreshExtension} from './extension'
import * as reduceEntries from './reducers'

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
  (options?: ReactRefreshPluginOptions): Promise<Framework>
}

export interface reactRefresh {
  (options?: boolean): Promise<Framework>
}

export const reactRefresh: reactRefresh = async function (
  userOptions?: ReactRefreshPluginOptions | boolean,
) {
  const ctx = this as Framework

  if (
    userOptions === false &&
    ctx.extensions.has('@pmmmwh/react-refresh-webpack-plugin')
  ) {
    ctx.extensions.remove('@pmmmwh/react-refresh-webpack-plugin')
    ctx.hooks.async('build.entry', async entries =>
      reduceEntries.remove(entries),
    )

    return ctx
  }

  /**
   * Add entries
   */
  ctx.hooks.async('build.entry', async entries =>
    reduceEntries.add(entries),
  )
  await ctx.extensions.add(ReactRefreshExtension)

  if (!userOptions || userOptions === true) return ctx

  if (isFunction(userOptions)) {
    ctx.extensions
      .get('@pmmmwh/react-refresh-webpack-plugin')
      .mutateOptions(userOptions)

    return ctx
  }

  ctx.extensions
    .get('@pmmmwh/react-refresh-webpack-plugin')
    .mergeOptions(userOptions)

  return ctx
}
