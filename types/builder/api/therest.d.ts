/**
 * Debug mode
 */
type debug = any;
/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {typeof import('./../index')} bud
 */
declare function debug(debug: any): typeof import('./../index');
/**
 * Development mode
 */
type dev = any;
/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {typeof import('./../index')} bud
 */
declare function dev(options: any): typeof import('./../index');
/**
 * Enable or disable source-maps
 */
type maps = any;
/**
 * Enable or disable source-maps
 * @typedef {func.<maps>}  maps
 * @param   {boolean}      mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
declare function maps(enabled: any): typeof import('./../index');
/**
 * Set maxChunks for code splitting
 */
type maxChunks = any;
/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {typeof import('./../index')}     bud
 */
declare function maxChunks(chunkCount: number | string): typeof import('./../index');
/**
 * Enable or disable minification
 *
 * @param  {bool} [bud.inProduction] true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
declare function mini(enable: any): typeof import('./../index');
/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {typeof import('./../index')} bud
 */
declare function splitting(enabled: any): typeof import('./../index');
/**
 * Enable or disable vendor bundles.
 *
 * @param  {bool}  [true] true if enabled
 * @return {typeof import('./../index')} bud
 */
declare function vendor(enabled: any): typeof import('./../index');
/**
 * Enable or disable watch mode.
 */
type watch = any;
/**
 * Enable or disable watch mode.
 * @typedef {func.<watch>} watch
 * @param   {bool}         true - if enabled
 * @return  {typeof import('./../index')} bud
 */
declare function watch(enabled: any): typeof import('./../index');
/**
 * Watch mode timeout
 */
type watchTimeout = any;
/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {typeof import('./../index')}       bud
 */
declare function watchTimeout(timeout: number): typeof import('./../index');
//# sourceMappingURL=therest.d.ts.map