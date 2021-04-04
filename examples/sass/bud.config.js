/**
 * Sass configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = app =>
  app
    .use([
      require('@roots/bud-postcss'),
      require('../../node_modules/@roots/bud-sass'),
    ])
    .entry('app', ['app.scss'])
