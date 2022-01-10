import {IncomingMessage, ServerResponse} from 'webpack-dev-middleware'

import {WebpackDevMiddleware} from './dev.dependencies'
import type {Framework} from './dev.interface'

/**
 * Dev middleware factory
 *
 * @public
 */
export default function dev(app: Framework) {
  const options = makeOptions(app)
  return WebpackDevMiddleware(app.compiler.instance as any, options)
}

/**
 * Dev middleware options factory
 *
 * @public
 */
const makeOptions = (
  app: Framework,
): WebpackDevMiddleware.Options<IncomingMessage, ServerResponse> => ({
  writeToDisk: true,
  publicPath: app.hooks.filter('build.output.publicPath'),
  stats: false,
  headers: {
    ['X-Server']: '@roots/bud',
  },
})
