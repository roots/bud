// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
modulee.exports = app => {
  app
    .template({
      template: 'public/index.html',
    })
    .entry('app', 'app.js')
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks().minimize()
    })
}
