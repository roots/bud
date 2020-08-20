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
    headers?: any
    historyApiFallback?: boolean
    overlay?: boolean
    secure?: boolean
    proxy?: any
    changeOrigin?: boolean
    chokidar?: any
  },
): Bud {
  this.features.enable('hot', options?.enabled ?? true)
  options?.watch &&
    this.options.set('watch', [...this.options.get('watch'), ...options.watch])

  const devServer = this.options.has('devServer')
    ? this.options.get('devServer')
    : {}

  const proxyAll =
    devServer.proxy && devServer.proxy['**'] ? devServer.proxy['**'] : {}

  const chokidarHandler = options?.chokidar ?? {
    before(app, server) {
      chokidar.watch(options?.watch ?? []).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed')
      })
    },
  }

  this.options.set(
    'devServer',
    this.hooks.filter('api.hot', {
      ...devServer,
      ...chokidarHandler,
      hot: options?.enabled ?? devServer.enabled ?? true,
      host: options?.host ?? devServer.host ?? 'localhost',
      overlay: options?.overlay ?? devServer.overlay ?? true,
      port: options?.port ?? devServer.port ?? 3000,
      secure: options?.secure ?? devServer.secure ?? false,
      open: options?.open ?? devServer.open ?? true,
      historyApiFallback:
        options?.historyApiFallback ?? devServer.historyApiFallback ?? true,
      headers: {
        ...(this.options.get('headers') ?? []),
        ...(options?.headers ?? []),
      },
      proxy: {
        ...(devServer.proxy ?? []),
        '**': {
          ...(proxyAll ?? []),
          target: options?.host ?? proxyAll?.target ?? 'http://localhost',
          secure: options?.secure ?? proxyAll?.secure ?? devServer.secure,
          changeOrigin: options?.changeOrigin ?? proxyAll?.changeOrigin ?? true,
          port: options?.port ?? proxyAll?.port ?? devServer.port,
          headers: {
            ...this.options.get('devServer.headers'),
            ...(options?.headers ?? proxyAll?.headers ?? []),
          },
        },
        ...(options?.proxy ?? []),
      },
    }),
  )

  return this
}

export {hot}
