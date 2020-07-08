/**
 * Debug mode
 */
type debug = any;
/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {object.<bud>} bud instance
 */
declare function debug(debug: any): any;
/**
 * Development mode
 */
type dev = any;
/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {object.<bud>} bud instance
 */
declare function dev(options: any): any;
/**
 * Specify webpack devtool
 */
type devtool = any;
/**
 * Specify webpack devtool
 * @typedef {func.<devtool>} devtool
 * @param   {string}         devtool - webpack devtool to utilize
 * @return  {object.<bud>}   bud instance
 */
declare function devtool(devtool: string): any;
/**
 * Enable or disable source-maps
 */
type maps = any;
/**
 * Enable or disable source-maps
 * @typedef {func.<maps>}  maps
 * @param   {boolean}      mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {object.<bud>} bud instance
 */
declare function maps(enabled: any): any;
/**
 * Set maxChunks for code splitting
 */
type maxChunks = any;
/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {object.<bud>}     bud instance
 */
declare function maxChunks(chunkCount: number | string): any;
/**
 * Enable or disable minification
 *
 * @param  {bool} [bud.inProduction] true to enable CSS/JS minification.
 * @return {object.<bud>} bud instance
 */
declare function mini(enable: any): any;
/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {object.<bud>} bud instance
 */
declare function splitting(enabled: any): any;
/**
 * Enable or disable vendor bundles.
 *
 * @param  {bool}  [true] true if enabled
 * @return {object.<bud>} bud instance
 */
declare function vendor(enabled: any): any;
/**
 * Enable or disable watch mode.
 */
type watch = any;
/**
 * Enable or disable watch mode.
 * @typedef {func.<watch>} watch
 * @param   {bool}         true - if enabled
 * @return  {object.<bud>} bud instance
 */
declare function watch(enabled: any): any;
/**
 * Watch mode timeout
 */
type watchTimeout = any;
/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {object.<bud>}       bud instance
 */
declare function watchTimeout(timeout: number): any;
//# sourceMappingURL=therest.d.ts.map