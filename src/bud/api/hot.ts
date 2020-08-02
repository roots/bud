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
    historyApiFallback?: boolean
    overlay?: boolean
    secure?: boolean
    proxy?: any
    changeOrigin?: boolean
    chokidar?: object
  },
): Bud {
  this.logger.info(options, `[api] bud.hot called`)

  if (options?.enabled === false) {
    return this
  }

  options?.watch && this.options.set('watch', [
    ...this.options.get('watch'),
    ...options.watch,
  ])

  this.features.enable('hot')

  const dev = this.options.has('dev') ? this.options.get('dev') : {}
  const proxyAll = dev.proxy && dev.proxy['**'] ? dev.proxy['**'] : {}

  const chokidarHandler = options?.chokidar ?? {
    before(app, server) {
      chokidar.watch(options?.watch ?? []).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed')
      })
    }
  }

  this.options.set('dev', {
    ...dev,
    ...chokidarHandler,
    hot: options?.enabled ?? dev.enabled ?? true,
    host: options?.host ?? dev.host ?? 'localhost',
    overlay: options?.overlay ?? dev.overlay ?? true,
    port: options?.port ?? dev.port ?? 3000,
    secure: options?.secure ?? dev.secure ?? false,
    open: options?.open ?? dev.open ?? true,
    historyApiFallback: options?.historyApiFallback ?? dev.historyApiFallback ?? true,
    headers: {
      ...(this.options.get('headers') ?? []),
      ...(options?.headers ?? []),
    },
    proxy: {
      ...(dev.proxy ?? []),
      '**': {
        ...(proxyAll ?? []),
        target: options?.host ?? proxyAll?.target ?? 'http://localhost',
        secure: options?.secure ?? proxyAll?.secure ?? dev.secure,
        changeOrigin: options?.changeOrigin ?? proxyAll?.changeOrigin ?? true,
        port: options?.port ?? proxyAll?.port ?? dev.port,
        headers: options?.headers ?? proxyAll?.headers ?? this.options.get('headers') ?? [],
      },
      ...(options?.proxy ?? []),
    },
  })

  return this
}

export {hot}
