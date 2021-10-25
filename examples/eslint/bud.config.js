// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = app =>
  app
    .use([require('@roots/bud-eslint')])
    .template()
    .entry('app', 'app.js')
