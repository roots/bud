import type {Bud, Hot} from './types'
import chokidar from 'chokidar'

const hot: Hot = function (
  this: Bud,
  options: {
    enabled?: boolean
    host: string
    port?: number
    watch?: string[]
    open?: boolean
    headers?: object
    secure?: boolean
  },
): Bud {
  this.features.set('hot', options.enabled ?? true)

  if (this.features.enabled('hot')) {
    this.options.merge('dev', {
      before(app, server) {
        chokidar.watch(options.watch ?? []).on('all', function () {
          server.sockWrite(server.sockets, 'content-changed')
        })
      },
      host: options.host ?? 'localhost',
      proxy: {
        ...this.options.get('dev').proxy,
        '**': {
          target: options.host || 'localhost',
          secure: options.secure || false,
          changeOrigin: true,
          port: options.port ?? 3020,
        },
      },
      headers: {
        ...this.options.get('dev').headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
        ...(options.headers || {}),
      },
      hot: true,
      overlay: true,
      historyApiFallback: true,
      open: options.open ?? false,
    })
  }

  return this
}

export {hot}
