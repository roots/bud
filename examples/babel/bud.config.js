/**
 * Babel configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = bud =>
  bud
    .use(require('@roots/bud-babel'))
    .html({enabled: true})
    .entry({
      'scripts/app': '*.js',
      'styles/app': '*.css',
    })
