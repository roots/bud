import type {Bud} from '@roots/bud-framework'

import webpackHotMiddleware from './webpack-hot-middleware/middleware'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (app: Bud) => any = app =>
  app.hooks.filter('middleware.hot.options')

/**
 * Hot middleware factory
 *
 * @public
 */
export const hot = (app: Bud) =>
  webpackHotMiddleware(app.compiler.compilation, options(app))
