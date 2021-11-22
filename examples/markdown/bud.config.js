// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} bud
 */
module.exports = async bud => {
  bud.entry('app', 'app.js').minimize().splitChunks().template()
}
