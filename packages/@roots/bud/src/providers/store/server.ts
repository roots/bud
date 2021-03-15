import type {Server} from '@roots/bud-typings'
import {source} from './source'

/**
 * Server config source
 */
export const server: Server.Options = {
  /**
   * Hostname
   *
   * @default localhost
   */
  host: source(['server.host', 'APP_HOST']),

  /**
   * Port
   *
   * @default localhost
   */
  port: source(['server.port', 'APP_PORT']),

  /**
   * Proxy
   *
   * @default {host:localhost,port:8000}
   */
  proxy: {
    host: source(['server.proxy.host', 'APP_PROXY_HOST']),
    port: source(['server.proxy.port', 'APP_PROXY_PORT']),
  },

  /**
   * File watcher options
   */
  watch: {
    files: source(['server.watch.files']),
    options: {
      persistent: source(['server.watch.options']),
    },
  },

  /**
   * Autorewrite server
   */
  autoRewrite: true,

  /**
   * Change-origin headers for proxy.
   */
  changeOrigin: true,

  /**
   * Follow redirections when proxied.
   *
   * @note for wordpress users: Turning this off will break admin.
   */
  followRedirects: true,

  /**
   * Defines the level of messages logged by server middleware
   */
  logLevel: source(['server.loglevel', 'APP_SERVER_LOG_LEVEL']),

  /**
   * Enabled middlewares
   */
  middleware: {
    /**
     * Is proxy middleware enabled?
     */
    proxy: source([
      'server.middleware.proxy',
      'APP_MIDDLEWARE_PROXY',
    ]),

    /**
     * Is hot middleware enabled?
     */
    hot: source(['server.middleware.hot', 'APP_MIDDLEWARE_HOT']),

    /**
     * Is dev middleware enabled?
     */
    dev: source(['server.middleware.dev', 'APP_MIDDLEWARE_DEV']),
  },

  /**
   * Pass custom HTTP headers on each request.
   *
   * @example {"X-Custom-Header": "Tru tho"}
   */
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'X-Requested-With, content-type, Authorization',
  },

  /**
   * Specify HTTP request methods accepted by the server.
   *
   * @default ['GET','HEAD']
   */
  methods: source(['server.methods', 'APP_METHODS']),

  /**
   * Register custom extension mappings
   *
   * @default null
   */
  mimeTypes: null,
}
