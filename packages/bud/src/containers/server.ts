import type {Server} from '@roots/bud-server'

/**
 * Automatically rewrite hostname over proxy connection.
 */
export const autoRewrite: Server.Config['autoRewrite'] = true

/**
 * Change-origin headers for proxy.
 */
export const changeOrigin: Server.Config['changeOrigin'] = true

/**
 * Follow redirections when proxied.
 *
 * Turning this off w/ WordPress is a travesty.
 */
export const followRedirects: Server.Config['followRedirects'] = true

/**
 * Proxied headers.
 */
export const headers: Server.Config['headers'] = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'X-Requested-With, content-type, Authorization',
}

export const hot: Server.Config['hot'] = true

/**
 * Hostname to use for dev server.
 */
export const host: Server.Config['host'] = 'localhost'

/**
 * Port to use for dev server.
 */
export const port: Server.Config['port'] = 3000

/**
 * Proxy destination
 */
export const proxy: Server.Config['proxy'] = undefined

/**
 * Filename of html used for WDS file index at root.
 */
export const index: Server.Config['index'] = 'index.html'

/**
 * Methods supported by dev server.
 */
export const methods: Server.Config['methods'] = ['GET', 'HEAD']

/**
 * Public path (base url)
 */
export const publicPath: Server.Config['publicPath'] = '/'

/**
 * Provide
 */
export const ssl: Server.Config['ssl'] = false

/**
 * Render WDS output on the server before sending to client.
 */
export const serverSideRender: Server.Config['serverSideRender'] = false

/**
 * Watch mode options
 */
export const watchOptions: Server.Config['watchOptions'] = {
  aggregateTimeout: 300,
  poll: true,
}

/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
export const writeToDisk: Server.Config['writeToDisk'] = true
