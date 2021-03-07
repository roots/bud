import type {Server} from '@roots/bud-typings'

/**
 * Enabled middlewares
 */
export const middleware: Server.Options['middleware'] = {
  /**
   * Is proxy middleware enabled?
   */
  proxy: false,

  /**
   * Is hot middleware enabled?
   */
  hot: true,

  /**
   * Is dev middleware enabled?
   */
  dev: true,
}

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
 * If true, the option will instruct the module to write files to the configured
 * location on disk as specified in your webpack config file
 *
 * This option also accepts a Function value, which can be used to filter which
 * files are written to disk
 *
 * @note Build is still served from RAM even when `true`.
 */
export const writeToDisk = true

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
 * Watch mode options
 */
export const watch: Server.Options['watch'] = {
  files: [
    '**/*.html',
    '**/*.php',
    '**/*.ejs',
    '!node_modules',
    '!vendor',
  ],
  options: {
    persistent: true,
  },
}

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
