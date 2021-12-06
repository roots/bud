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
  // const devUrl = new URL(app.store.get('server.dev.url'))
  const heartbeatUrl = `/__webpack_hmr`

  app.server.log('info', {
    message: 'heartbeat url',
    suffix: heartbeatUrl,
  })

  return {
    path: heartbeatUrl,
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
