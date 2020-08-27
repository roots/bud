import type {Bud} from './types'
import {WebpackDevServer} from '@roots/bud-typings'
import chokidar from 'chokidar'
import {bud} from '..'

const fallback = (options: Bud['options']): WebpackDevServer => ({
  host: 'http://localhost',
  port: 3000,
  overlay: true,
  open: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },
})

interface DevOptions extends WebpackDevServer {
  enabled: boolean
  defaults: boolean
  watch: string[]
  chokidar: {(app: any, server: any)}
}

type Dev = (this: Bud, options: DevOptions) => Bud

const dev: Dev = function ({defaults = true, ...options}) {
  const specified = option => options.hasOwnProperty(option)
  const useDefaults = defaults == true

  !specified('enabled') &&
    useDefaults &&
    this.features.set('dev', this.inDevelopment)

  !specified('hot') &&
    useDefaults &&
    this.features.set('hot', this.inDevelopment)

  !specified('watch') &&
    useDefaults &&
    this.features.set('watch', this.inDevelopment)

  specified('enabled') && this.features.set('dev', options.enabled)

  specified('watch') &&
    (() => {
      this.options.set('watch', [
        ...(this.options.get('watch') ?? []),
        ...options.watch,
      ])
      this.features.set('watch', true)
    })()

  specified('chokidar')
    ? this.options.merge('webpack.devServer', {...options.chokidar})
    : useDefaults &&
      !this.options.get('webpack.devServer.before') &&
      this.options.set('webpack.devServer', {
        ...this.options.get('webpack.devServer'),
        before(app, server) {
          chokidar.watch(options?.watch ?? []).on('all', function () {
            server.sockWrite(server.sockets, 'content-changed')
          })
        },
      })

  specified('hot')
    ? this.options.set(
        'webpack.devServer.hot',
        this.hooks.filter('api.dev.hot', options.hot),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.hot') &&
      this.options.set('webpack.devServer.hot', bud.inDevelopment)

  specified('host')
    ? this.options.set(
        'webpack.devServer.host',
        this.hooks.filter('api.dev.host', options.host),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.host') &&
      this.options.set(
        'webpack.devServer.host',
        fallback(this.options).host,
      )

  specified('overlay')
    ? this.options.set(
        'webpack.devServer.overlay',
        this.hooks.filter('api.dev.overlay', options.overlay),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.overlay') &&
      this.options.set(
        'webpack.devServer.overlay',
        fallback(this.options).overlay,
      )

  specified('port')
    ? this.options.set(
        'webpack.devServer.port',
        this.hooks.filter('api.dev.port', options.port),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.port') &&
      this.options.set(
        'webpack.devServer.port',
        fallback(this.options).port,
      )

  specified('open')
    ? this.options.set(
        'webpack.devServer.open',
        this.hooks.filter('api.dev.open', options.open),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.open') &&
      this.options.set(
        'webpack.devServer.open',
        fallback(this.options).open,
      )

  specified('historyApiFallback')
    ? this.options.set(
        'webpack.devServer.historyApiFallback',
        this.hooks.filter(
          'api.dev.historyApiFallback',
          options.historyApiFallback,
        ),
      )
    : useDefaults &&
      !this.options.has('webpack.devServer.historyApiFallback') &&
      this.options.set(
        'webpack.devServer.historyApiFallback',
        fallback(this.options).historyApiFallback,
      )

  specified('headers')
    ? this.options.set('webpack.devServer.headers', {
        ...this.options.get('webpack.devServer.headers'),
        ...this.hooks.filter('api.dev.headers', options.headers),
      })
    : useDefaults &&
      !this.options.has('webpack.devServer.headers') &&
      this.options.set(
        'webpack.devServer.headers',
        fallback(this.options).headers,
      )

  specified('writeToDisk')
    ? this.options.set('webpack.devServer.writeToDisk', options.writeToDisk)
    : useDefaults &&
      !this.options.has('webpack.devServer.writeToDisk') &&
      this.options.set('webpack.devServer.writeToDisk', false)

  return this
}

export {dev, Dev}
