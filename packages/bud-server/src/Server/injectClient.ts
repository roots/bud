import {isArray} from '@roots/bud-support'
import Framework from '@roots/bud-typings'

const toInject = require
  .resolve('webpack-hot-middleware/client')
  .concat('?path=/__webpack_hmr&timeout=2000')

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Framework.Server.InjectClient = (
  entrypoints: Framework.Webpack.Entry,
) =>
  Object.entries(entrypoints).reduce(
    (acc, [name, entry]) => ({
      ...acc,
      [name]: [toInject, ...(isArray(entry) ? entry : [entry])],
    }),
    {},
  )
