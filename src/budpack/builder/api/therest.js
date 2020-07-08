/**
 * Debug mode
 * @typedef {func.<debug>} debug
 * @param   {boolean}      enabled - true to enable debug mode
 * @return  {object.<bud>} bud instance
 */
const debug = debug => {
  bud.options.debug = debug

  return bud
}

/**
 * Development mode
 * @typedef {func.<dev>}   dev
 * @param   {Object}       options
 * @return  {object.<bud>} bud instance
 */
const dev = options => {
  bud.options.dev = {
    ...bud.options.dev,
    ...options,
  }

  return bud
}

/**
 * Specify webpack devtool
 * @typedef {func.<devtool>} devtool
 * @param   {string}         devtool - webpack devtool to utilize
 * @return  {object.<bud>}   bud instance
 */
const devtool = devtool => {
  bud.options.devtool = devtool

  return bud
}

/**
 * Enable or disable source-maps
 * @typedef {func.<maps>}  maps
 * @param   {boolean}      mapsEnabled - true to enable source-maps. default: !bud.inProduction.
 * @return  {object.<bud>} bud instance
 */
const maps = enabled => {
  bud.options.mapped = enabled

  return bud
}

/**
 * Set maxChunks for code splitting
 * @typedef {func.<maxChunks>} maxChunks
 * @param   {number|string}    chunkCount - maximum number of chunks. default: 'Infinity'.
 * @return  {object.<bud>}     bud instance
 */
const maxChunks = chunkCount => {
  bud.options.splitting.maxChunks = chunkCount

  return bud
}

/**
 * Enable or disable minification
 *
 * @param  {bool} [bud.inProduction] true to enable CSS/JS minification.
 * @return {object.<bud>} bud instance
 */
const mini = enable => {
  bud.options.minified = enable

  return bud
}

/**
 * Enable or disable code splitting.
 *
 * @param  {bool} [true]  enabled
 * @return {object.<bud>} bud instance
 */
const splitting = enabled => {
  bud.options.splitting.disabled = enabled

  return bud
}

/**
 * Enable or disable vendor bundles.
 *
 * @param  {bool}  [true] true if enabled
 * @return {object.<bud>} bud instance
 */
const vendor = enabled => {
  bud.options.vendor = enabled

  return bud
}

/**
 * Enable or disable watch mode.
 * @typedef {func.<watch>} watch
 * @param   {bool}         true - if enabled
 * @return  {object.<bud>} bud instance
 */
const watch = enabled => {
  bud.options.watching = enabled

  return bud
}

/**
 * Watch mode timeout
 * @typedef {func.<watchTimeout} watchTimeout
 * @param   {number}             timeout - in ms
 * @return  {object.<bud>}       bud instance
 */
const watchTimeout = timeout => {
  bud.options.dev.watchOptions.aggregateTimeout = timeout

  return bud
}
