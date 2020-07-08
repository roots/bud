/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {typeof import('./../index')} TouchList
 */
const debug = debug => {
  TouchList.options.debug = debug

  return TouchList
}

/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {typeof import('./../index')} TouchList
 */
const dev = options => {
  TouchList.options.dev = {
    ...TouchList.options.dev,
    ...options,
  }

  return TouchList
}

/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {typeof import('./../index')}     TouchList
 */
const maxChunks = chunkCount => {
  TouchList.options.splitting.maxChunks = chunkCount

  return TouchList
}

/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {typeof import('./../index')} TouchList
 */
const splitting = enabled => {
  TouchList.options.splitting.disabled = enabled

  return TouchList
}

/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {typeof import('./../index')}       TouchList
 */
const watchTimeout = timeout => {
  TouchList.options.dev.watchOptions.aggregateTimeout = timeout

  return TouchList
}
