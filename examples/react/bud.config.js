/**
 * React configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(app: Bud): Bud}
 */

module.exports = app => {
  return app
    .use([require('@roots/bud-terser')])
    .html({
      template: 'public/index.html',
    })
    .entry({
      app: 'app.{js,css}',
    })
    .when(app.isProduction, () => {
      app.runtime().splitChunks()
    })
    .persist({
      type: 'memory',
    })
}
