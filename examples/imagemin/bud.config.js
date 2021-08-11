// @ts-check

const imagemin = require('@roots/bud-imagemin')

/**
 * @function config
 * @param {import('@roots/bud').Bud} app
 */
module.exports = app =>
  app
    .use(imagemin)
    .template({template: app.path('src', 'index.html')})
    .entry({app: 'app.js'})
