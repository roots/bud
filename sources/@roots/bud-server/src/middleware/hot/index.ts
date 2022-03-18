import type {Framework} from '@roots/bud-framework'

import webpackHotMiddleware from './webpack-hot-middleware/middleware'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (app: Framework) => any = app =>
  app.hooks.filter('middleware.hot.options')

/**
 * Hot middleware factory
 *
 * @public
 */
export const hot = (app: Framework) =>
  webpackHotMiddleware(app.compiler.compilation, options(app))
