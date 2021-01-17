import {isArray} from 'lodash'
import {Framework, Webpack} from '@roots/bud-typings'

/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
export declare type InjectClient = (app: Framework) => void

/**
 * Injects webpack entrypoints with HMR client scripts.
 *
 * Filters on `webpack.entry`
 */
export const injectClient: InjectClient = app =>
  app.hooks.on('webpack.entry', entry =>
    Object.entries(entry).reduce(
      (
        entries: Webpack.Entry,
        [name, assets]: [string, string | string[]],
      ) => ({
        ...entries,
        [name]: [
          require.resolve('webpack-hot-middleware/client'),
          ...(isArray(app.access(assets))
            ? app.access(assets)
            : [app.access(assets)]),
        ],
      }),
      {},
    ),
  )
