// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = async app =>
  app.template().entry('app', 'app.js')
