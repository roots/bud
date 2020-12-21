import {isArray} from '@roots/bud-support'
import {Webpack} from '@roots/bud-typings'

const toInject = require
  .resolve('webpack-hot-middleware/client')
  .concat('?path=/__webpack_hmr&timeout=2000')

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: InjectClient = (
  entrypoints: Webpack.Entry,
) =>
  Object.entries(entrypoints).reduce(
    (acc, [name, entry]) => ({
      ...acc,
      [name]: [toInject, ...(isArray(entry) ? entry : [entry])],
    }),
    {},
  )

/**
 * Inject webpack entrypoints with
 * client HMR handling script(s).
 */
export type InjectClient = (
  entrypoints: Webpack.Entry,
) => Webpack.Entry
