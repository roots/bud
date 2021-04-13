/**
 * ESBuild configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = app =>
  app
    .use(require('@roots/bud-criticalcss'))
    .html({enabled: true})
    .entry('scripts/app', 'app.css')
    .runtime()
    .splitChunks()
    .hash()
