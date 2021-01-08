import type { Server } from '@roots/bud-typings';
/**
 * Automatically rewrite hostname over proxy connection.
 */
export declare const autoRewrite: Server.Options['autoRewrite'];
/**
 * Change-origin headers for proxy.
 */
export declare const changeOrigin: Server.Options['changeOrigin'];
/**
 * Follow redirections when proxied.
 *
 * Turning this off w/ WordPress is a travesty.
 */
export declare const followRedirects: Server.Options['followRedirects'];
/**
 * Proxied headers.
 */
export declare const headers: Server.Options['headers'];
/**
 * Hostname to use for dev server.
 */
export declare const host: Server.Options['host'];
/**
 * Port to use for dev server.
 */
export declare const port: Server.Options['port'];
/**
 * Proxy destination
 */
export declare const proxy: Server.Options['proxy'];
/**
 * Filename of html used for WDS file index at root.
 */
export declare const index: Server.Options['index'];
/**
 * Methods supported by dev server.
 */
export declare const methods: Server.Options['methods'];
/**
 * Public path (base url)
 */
export declare const publicPath: Server.Options['publicPath'];
/**
 * Provide
 */
export declare const ssl: Server.Options['ssl'];
/**
 * Render WDS output on the server before sending to client.
 */
export declare const serverSideRender: Server.Options['serverSideRender'];
/**
 * Watch mode options
 */
export declare const watchOptions: Server.Options['watchOptions'];
/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
export declare const writeToDisk: Server.Options['writeToDisk'];
//# sourceMappingURL=server.d.ts.map