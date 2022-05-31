import type {Bud} from '@roots/bud-framework'

import webpackHotMiddleware from './webpack-hot-middleware/middleware.js'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (app: Bud) => any = app =>
  app.hooks.filter('dev.middleware.hot.options')

/**
 * Hot middleware factory
 *
 * @public
 */
export const hot = (app: Bud) =>
  webpackHotMiddleware(app.compiler.compilation, options(app))
