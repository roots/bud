// @ts-check

const imagemin = require('@roots/bud-imagemin')

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = app =>
  app
    .use(imagemin)
    .template({template: app.path('src', 'index.html')})
    .entry({app: 'app.js'})
    .minimize()
