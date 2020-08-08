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
  this.logger.info(
    {
      name: 'bud.api',
      function: 'bud.hot',
      options,
    },
    'api.hot called',
  )

  if (options?.enabled === false) {
    this.logger.info(
      {
        name: 'bud.api',
        function: 'bud.hot',
        enabled: options.enabled,
      },
      `api.hot is not applicable to this build. skipping.`,
    )

    return this
  }

  if (options?.watch) {
    this.options.set('watch', [...this.options.get('watch'), ...options.watch])
  }

  this.features.enable('hot')

  const dev = this.options.has('dev') ? this.options.get('dev') : {}
  const proxyAll = dev.proxy && dev.proxy['**'] ? dev.proxy['**'] : {}

  const chokidarHandler = options?.chokidar ?? {
    before(app, server) {
      chokidar.watch(options?.watch ?? []).on('all', function () {
        server.sockWrite(server.sockets, 'content-changed')
      })
    },
  }

  const devServerConfig = {
    ...dev,
    ...chokidarHandler,
    hot: options?.enabled ?? dev.enabled ?? true,
    host: options?.host ?? dev.host ?? 'localhost',
    overlay: options?.overlay ?? dev.overlay ?? true,
    port: options?.port ?? dev.port ?? 3000,
    secure: options?.secure ?? dev.secure ?? false,
    open: options?.open ?? dev.open ?? true,
    historyApiFallback:
      options?.historyApiFallback ?? dev.historyApiFallback ?? true,
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
        headers:
          options?.headers ?? proxyAll?.headers ?? this.options.get('headers') ?? [],
      },
      ...(options?.proxy ?? []),
    },
  }

  this.logger.info(
    {
      name: 'bud.api',
      function: 'bud.hot',
      devServerConfig,
    },
    'Updating dev server configuration',
  )

  this.options.set('dev', devServerConfig)

  return this
}

export {hot}
