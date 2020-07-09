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
 * Set maxChunks for code splitting
 */
type maxChunks = any;
/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {(number|string)} chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {typeof import('./../index')} bud
 */
declare function maxChunks(chunkCount: (number | string)): typeof import('./../index');
/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {typeof import('./../index')} bud
 */
declare function splitting(enabled: any): typeof import('./../index');
/**
 * Watch mode timeout
 */
type watchTimeout = any;
/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {typeof import('./../index')}       this
 */
declare function watchTimeout(timeout: number): typeof import('./../index');
//# sourceMappingURL=therest.d.ts.map