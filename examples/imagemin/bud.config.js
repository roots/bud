// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 * @typedef {import('@roots/bud-imagemin')}
 *
 * @param {Bud} app
 */
module.exports = async app => {
  app
    .template({template: app.path('@src/index.html')})
    .entry({app: 'app.js'})
    .minimize()
    .imagemin('lossy')
}
