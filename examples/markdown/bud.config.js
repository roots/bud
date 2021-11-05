// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = bud => {
  bud.entry('app', 'app.js').minimize().splitChunks().template()
}
