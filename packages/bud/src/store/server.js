"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToDisk = exports.watchOptions = exports.serverSideRender = exports.ssl = exports.publicPath = exports.methods = exports.index = exports.proxy = exports.port = exports.host = exports.headers = exports.followRedirects = exports.changeOrigin = exports.autoRewrite = void 0;
/**
 * Automatically rewrite hostname over proxy connection.
 */
exports.autoRewrite = true;
/**
 * Change-origin headers for proxy.
 */
exports.changeOrigin = true;
/**
 * Follow redirections when proxied.
 *
 * Turning this off w/ WordPress is a travesty.
 */
exports.followRedirects = true;
/**
 * Proxied headers.
 */
exports.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
};
/**
 * Hostname to use for dev server.
 */
exports.host = 'localhost';
/**
 * Port to use for dev server.
 */
exports.port = 3000;
/**
 * Proxy destination
 */
exports.proxy = {
    host: 'localhost',
    port: 8000,
};
/**
 * Filename of html used for WDS file index at root.
 */
exports.index = 'index.html';
/**
 * Methods supported by dev server.
 */
exports.methods = ['GET', 'HEAD'];
/**
 * Public path (base url)
 */
exports.publicPath = '/';
/**
 * Provide
 */
exports.ssl = false;
/**
 * Render WDS output on the server before sending to client.
 */
exports.serverSideRender = false;
/**
 * Watch mode options
 */
exports.watchOptions = {
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
};
/**
 * Write WDS output to disk.
 *
 * @note Build is still served from RAM even when `true`.
 */
exports.writeToDisk = true;
//# sourceMappingURL=server.js.map