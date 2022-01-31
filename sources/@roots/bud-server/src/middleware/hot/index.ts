import type {Framework} from '@roots/bud-framework'
import WebpackHotMiddleware from 'webpack-hot-middleware'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (
  app: Framework,
) => WebpackHotMiddleware.MiddlewareOptions = app =>
  app.hooks.filter('middleware.hot.options', {
    path: `/__bud/hmr`,
    log: false,
    heartbeat: 2000,
  })

/**
 * Hot middleware factory
 *
 * @public
 */
export default function hot(app: Framework) {
  return WebpackHotMiddleware(app.compiler.instance, options(app))
}
