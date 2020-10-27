import {lodash as _} from '@roots/bud-support'

const toInject = require
  .resolve('webpack-hot-middleware/client')
  .concat(
    '?path=http://localhost:3000/__webpack_hmr&timeout=2000',
  )

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Framework.Server.InjectClient = (
  entrypoints: Framework.Webpack.Entry,
) =>
  Object.entries(entrypoints).reduce(
    (acc, [name, entry]) => ({
      ...acc,
      [name]: [
        toInject,
        ...(_.isArray(entry) ? entry : [entry]),
      ],
    }),
    {},
  )
