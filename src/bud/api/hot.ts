import type {Bud} from './types'
import chokidar from 'chokidar'

/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
const hot = function (this: Bud, options: {
  enabled: boolean,
  target: string,
  port?: number,
  watch?: string[],
}): Bud {
  this.state.features.hot = options.enabled ?? true

  if (this.state.features.hot) {
    this.state.options.dev = {
      ...this.state.options.dev,
      before(app, server) {
        chokidar.watch(options.watch ?? []).on( 'all', function() {
            server.sockWrite(server.sockets, 'content-changed');
          })
      },
      proxy: {
        ...this.state.options.dev.proxy,
        '**': {
          target: options.target,
          secure: false,
          changeOrigin: true,
          port: options.port ?? 3020,
        },
      },
      headers: {
        ...this.state.options.dev.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      hot: true,
      overlay: true,
      historyApiFallback: true,
      open: true,
    }
  }

  return this
}

export {hot}
