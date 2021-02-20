import type {Server} from '@roots/bud-typings'

/**
 * The index path for web server,
 *
 * If falsy (but not undefined), the server will not respond
 * to requests to the root URL.
 *
 * @default index.html
 */
// export const index: Server.Options['index'] = undefined

/**
 * This property allows a user to pass the list
 * of HTTP request methods accepted by the server.
 *
 * @default ['GET','HEAD']
 */
export const methods: Server.Options['methods'] = ['GET', 'HEAD']

/**
 * Defines the level of messages logged by Express/WDS middleware
 */
export const logLevel: Server.Options['logLevel'] = 'silent'

/**
 * This property allows a user to register custom mime
 * types or extension mappings
 *
 * @default null
 */
export const mimeTypes: Server.Options['mimeTypes'] = null

/**
 * Public path (base url)
 */
// export const publicPath: Server.Options['publicPath'] = '/'

export const watchFiles = [
  '**/*.htm(l)?',
  '**/*.php',
  '.ejs',
  '!node_modules',
  '!vendor',
]

/**
 * If true, the option will instruct the module to write files to the configured
 * location on disk as specified in your webpack config file
 *
 * This option also accepts a Function value, which can be used to filter which
 * files are written to disk
 *
 * @note Build is still served from RAM even when `true`.
 */
export const writeToDisk: Server.Options['writeToDisk'] = true

/**
 * Hostname to use for dev server.
 */
export const host: Server.Options['host'] = 'localhost'

/**
 * Port to use for dev server.
 */
export const port: Server.Options['port'] = 3000

/**
 * Watch mode options
 */
export const watchOptions: Server.Options['watchOptions'] = {
  /**
   * Add a delay before rebuilding once the first file changed.
   * This allows webpack to aggregate any other
   *
   * changes made during this time period into one rebuild.
   * Pass a value in milliseconds.
   *
   * @default 300
   */
  aggregateTimeout: 300,

  /**
   * For some systems, watching many file systems can result
   * in a lot of CPU or memory usage.
   *
   * It is possible to exclude a huge folder like node_modules.
   * It is also possible to use anymatch patterns.
   */
  ignored: undefined,

  /**
   * Turn on polling by passing true,
   * or specifying a poll interval in milliseconds.
   */
  poll: true,
}

/**
 * Proxy settings
 */

/**
 * Automatically rewrite hostname over proxy connection.
 */
export const autoRewrite: Server.Options['autoRewrite'] = true

/**
 * Change-origin headers for proxy.
 */
export const changeOrigin: Server.Options['changeOrigin'] = true

/**
 * Follow redirections when proxied.
 *
 * @note for wordpress users: Turning this off will break admin.
 */
export const followRedirects: Server.Options['followRedirects'] = true

/**
 * This property allows a user to pass custom HTTP headers on each request.
 *
 * @example { "X-Custom-Header": "yes" }
 */
export const headers: Server.Options['headers'] = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'X-Requested-With, content-type, Authorization',
}

/**
 * Proxy destination
 */
export const proxy: Server.Options['proxy'] = {
  host: 'localhost',
  port: 8000,
}
