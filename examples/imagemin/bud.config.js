// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 * @typedef {import('@roots/bud-imagemin/types/env')}
 *
 * @param {Bud} app
 */
module.exports = async app => {
  app
    .template({template: app.path('@src/index.html')})
    .entry({app: 'app.js'})

  /**
   * Enable minimizer
   */
  app.minimize()

  app.imagemin
    /**
     * Process jpeg assets
     *
     * Default is a value of `auto`:
     *   --> `app.imagemin.encode('mozjpeg', 'auto')
     */
    .encode('jpg', {quality: 75})
    .encode('png', {quality: 100})
}
