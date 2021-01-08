import type {Server} from '@roots/bud-typings'

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
 * Turning this off w/ WordPress is a travesty.
 */
export const followRedirects: Server.Options['followRedirects'] = true

/**
 * Proxied headers.
 */
export const headers: Server.Options['headers'] = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'X-Requested-With, content-type, Authorization',
}

/**
 * Hostname to use for dev server.
 */
export const host: Server.Options['host'] = 'localhost'

/**
 * Port to use for dev server.
 */
export const port: Server.Options['port'] = 3000

/**
 * Proxy destination
 */
export const proxy: Server.Options['proxy'] = {
  host: 'localhost',
  port: 8000,
}

/**
 * Filename of html used for WDS file index at root.
 */
export const index: Server.Options['index'] = 'index.html'

/**
 * Methods supported by dev server.
 */
export const methods: Server.Options['methods'] = ['GET', 'HEAD']

/**
 * Public path (base url)
 */
export const publicPath: Server.Options['publicPath'] = '/'

/**
 * Provide
 */
export const ssl: Server.Options['ssl'] = false

/**
 * Render WDS output on the server before sending to client.
 */
export const serverSideRender: Server.Options['serverSideRender'] = false

/**
 * Watch mode options
 */
export const watchOptions: Server.Options['watchOptions'] = {
  /**
   * Add a delay before rebuilding once the first file changed. This allows webpack to aggregate any other
   *
   * changes made during this time period into one rebuild.
   * Pass a value in milliseconds.
   * @default 300
   */
  aggregateTimeout: 300,

  /**
   * For some systems, watching many file systems can result in a lot of CPU or memory usage.
   *
   * It is possible to exclude a huge folder like node_modules.
   * It is also possible to use anymatch patterns.
   */
  // ignored: undefined,

  /** Turn on polling by passing true, or specifying a poll interval in milliseconds. */
  poll: true,
}

/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
export const writeToDisk: Server.Options['writeToDisk'] = true
