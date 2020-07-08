/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {typeof import('./../index')} bud
 */
const debug = debug => {
  bud.options.debug = debug

  return bud
}

/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {typeof import('./../index')} bud
 */
const dev = options => {
  bud.options.dev = {
    ...bud.options.dev,
    ...options,
  }

  return bud
}

/**
 * Enable or disable source-maps
 * @typedef {func.<maps>}  maps
 * @param   {boolean}      mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
const maps = enabled => {
  bud.options.mapped = enabled

  return bud
}

/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {typeof import('./../index')}     bud
 */
const maxChunks = chunkCount => {
  bud.options.splitting.maxChunks = chunkCount

  return bud
}

/**
 * Enable or disable minification
 *
 * @param  {bool} [bud.inProduction] true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
const mini = enable => {
  bud.options.minified = enable

  return bud
}

/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {typeof import('./../index')} bud
 */
const splitting = enabled => {
  bud.options.splitting.disabled = enabled

  return bud
}

/**
 * Enable or disable watch mode.
 * @typedef {func.<watch>} watch
 * @param   {bool}         true - if enabled
 * @return  {typeof import('./../index')} bud
 */
const watch = enabled => {
  bud.options.watching = enabled

  return bud
}

/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {typeof import('./../index')}       bud
 */
const watchTimeout = timeout => {
  bud.options.dev.watchOptions.aggregateTimeout = timeout

  return bud
}
