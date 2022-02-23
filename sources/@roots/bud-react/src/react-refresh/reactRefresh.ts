import type {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Framework} from '@roots/bud-framework'
import {lodash} from '@roots/bud-support'

import * as reduceEntries from './reducers'

const {isFunction, isUndefined} = lodash

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

/**
 * Cleanup
 *
 * @param app - Framework
 * @returns Framework
 */
const cleanup = (app: Framework) => {
  app.extensions.has('@pmmmwh/react-refresh-webpack-plugin') &&
    app.extensions.remove('@pmmmwh/react-refresh-webpack-plugin')

  app.babel.plugins['react-refresh/babel'] &&
    app.babel.unsetPlugin('react-refresh/babel')

  app.hooks.async('build.entry', async entries =>
    reduceEntries.remove(entries),
  )

  return app
}

/**
 * Register react-refresh-webpack-plugin
 *
 * @param app - Framework
 * @returns void
 */
const register = async (app: Framework) => {
  const {ReactRefreshExtension} = await import('./extension')

  await app.extensions.add(ReactRefreshExtension)
  app.hooks.on('build.entry', reduceEntries.add)
  app.babel.setPlugin('react-refresh/babel')
}

export const reactRefresh: reactRefresh = async function (
  userOptions?: ReactRefreshPluginOptions | boolean,
) {
  const ctx = this as Framework

  if (userOptions === false) return cleanup(ctx)

  await register(ctx)

  if (isUndefined(userOptions) || userOptions === true) return ctx

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
