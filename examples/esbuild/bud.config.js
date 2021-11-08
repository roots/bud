/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = app => {
  app
    .template()
    .entry({app: 'app.js'})
    .runtime()
    .splitChunks()
    .hash()
}
