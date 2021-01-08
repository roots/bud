import {isArray} from 'lodash'
import {Store, Webpack} from '@roots/bud-typings'

/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
export declare type InjectClient = (
  store: Store,
) => Webpack.Entry

/**
 * Client script
 */
const toInject =
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000'

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: InjectClient = store =>
  Object.entries(store.get('webpack.entry')).reduce(
    (
      entries,
      [name, assets]: [string, [Webpack.Configuration['entry']]],
    ) => ({
      ...entries,
      [name]: [
        toInject,
        ...(isArray(assets) ? assets : [assets]),
      ],
    }),
    {client: [toInject]},
  )
