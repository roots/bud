import type {Server} from '../Server'
/**
 * Automatically rewrite hostname over proxy connection.
 */
export declare const autoRewrite: Server.Config['autoRewrite']
/**
 * Change-origin headers for proxy.
 */
export declare const changeOrigin: Server.Config['changeOrigin']
/**
 * Follow redirections when proxied.
 *
 * Turning this off w/ WordPress is a travesty.
 */
export declare const followRedirects: Server.Config['followRedirects']
/**
 * Proxied headers.
 */
export declare const headers: Server.Config['headers']
/**
 * Hostname to use for dev server.
 */
export declare const host: Server.Config['host']
/**
 * Port to use for dev server.
 */
export declare const port: Server.Config['port']
/**
 * Filename of html used for WDS file index at root.
 */
export declare const index: Server.Config['index']
/**
 * Methods supported by dev server.
 */
export declare const methods: Server.Config['methods']
/**
 * Mimetypes supported by dev server.
 */
export declare const mimeTypes: Server.Config['mimeTypes']
/**
 * SSL certificate.
 */
export declare const ssl: Server.Config['ssl']
/**
 * Should WDS attempt to encrypt service.
 */
export declare const secure: Server.Config['secure']
/**
 * Render WDS output on the server before sending to client.
 */
export declare const serverSideRender: Server.Config['serverSideRender']
/**
 * Watch mode options
 */
export declare const watchOptions: Server.Config['watchOptions']
/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
export declare const writeToDisk: Server.Config['writeToDisk']
/**
 * Proxy over websockets.
 */
export declare const ws: Server.Config['ws']
/**
 * I don't want to support this.
 *
 * Related @see https://git.io/JTf9W
 */
export declare const lazy: Server.Config['lazy']
//# sourceMappingURL=index.d.ts.map
