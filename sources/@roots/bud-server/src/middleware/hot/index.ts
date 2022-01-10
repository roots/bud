// import {URL} from 'url'

import {WebpackHotMiddleware} from './hot.dependencies'
import type {Framework} from './hot.interface'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (
  app: Framework,
) => WebpackHotMiddleware.MiddlewareOptions = app => {
  return {
    path: `/__bud/hmr`,
    log: false,
    heartbeat: 2000,
  }
}

/**
 * Hot middleware factory
 *
 * @public
 */
export default function hot(app: Framework) {
  return WebpackHotMiddleware(
    app.compiler.instance,
    options(app),
  )
}
