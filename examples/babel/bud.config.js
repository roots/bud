/**
 * Babel configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(app: Bud): Bud}
 */

module.exports = app =>
  app
    .use(require('@roots/bud-babel'))
    .html()
    .entry({
      scripts: '*.js',
      styles: '*.css',
    })
    .persist({type: 'memory'})
