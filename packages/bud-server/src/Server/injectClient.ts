import {lodash as _} from '@roots/bud-support'
import type {Server} from '@roots/bud-typings'
import type Webpack from 'webpack'

const toInject = require
  .resolve('webpack-hot-middleware/client')
  .concat('?path=/__webpack_hmr&timeout=2000')

/**
 * Injects webpack.entry items with hot module scripts.
 */
export const injectClient: Server.InjectClient = (
  entrypoints: Webpack.Entry,
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
