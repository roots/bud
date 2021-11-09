import {WebpackHotMiddleware} from './hot.dependencies'
import type {Framework, Server} from './hot.interface'

/**
 * Hot middleware options
 *
 * @public
 */
const options: (
  config: Server.Configuration,
) => WebpackHotMiddleware.MiddlewareOptions = config => ({
  path: `/__webpack_hmr`,
  heartbeat: 10 * 1000,
})

/**
 * Hot middleware factory
 *
 * @public
 */
export default function hot(app: Framework) {
  this.log('hot middleware options', options)
  return WebpackHotMiddleware(
    app.compiler.instance,
    options(app.store.get('server')),
  )
}
