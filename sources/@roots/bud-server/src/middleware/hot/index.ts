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
    path: app.hooks.filter('middleware.hot.options.path', `/__bud/hmr`),
    log: app.hooks.filter('middleware.hot.options.log', false),
    heartbeat: app.hooks.filter('middleware.hot.options.heartbeat', 2000),
  })

/**
 * Hot middleware factory
 *
 * @public
 */
export const hot = (app: Framework) =>
  WebpackHotMiddleware(app.compiler.instance, options(app))
