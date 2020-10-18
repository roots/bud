/**
 * Automatically rewrite hostname over proxy connection.
 */
export const autoRewrite: Framework.Server.Config['autoRewrite'] = true

/**
 * Change-origin headers for proxy.
 */
export const changeOrigin: Framework.Server.Config['changeOrigin'] = true

/**
 * Follow redirections when proxied.
 *
 * Turning this off w/ WordPress is a travesty.
 */
export const followRedirects: Framework.Server.Config['followRedirects'] = true

/**
 * Proxied headers.
 */
export const headers: Framework.Server.Config['headers'] = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods':
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers':
    'X-Requested-With, content-type, Authorization',
}

/**
 * Hostname to use for dev server.
 */
export const host: Framework.Server.Config['host'] = 'localhost'

/**
 * Port to use for dev server.
 */
export const port: Framework.Server.Config['port'] = 3000

/**
 * Filename of html used for WDS file index at root.
 */
export const index: Framework.Server.Config['index'] = 'index.html'

/**
 * Methods supported by dev server.
 */
export const methods: Framework.Server.Config['methods'] = ['GET', 'HEAD']

/**
 * Mimetypes supported by dev server.
 */
export const mimeTypes: Framework.Server.Config['mimeTypes'] = null

/**
 * SSL certificate.
 */
export const ssl: Framework.Server.Config['ssl'] = false

/**
 * Should WDS attempt to encrypt service.
 */
export const secure: Framework.Server.Config['secure'] = false

/**
 * Render WDS output on the server before sending to client.
 */
export const serverSideRender: Framework.Server.Config['serverSideRender'] = false

/**
 * Watch mode options
 */
export const watchOptions: Framework.Server.Config['watchOptions'] = {
  aggregateTimeout: 300,
  poll: true,
}

/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
export const writeToDisk: Framework.Server.Config['writeToDisk'] = true
