// @ts-check
require('@roots/bud-criticalcss')

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = async app => {
  app
    .template({
      template: app.path('public/index.html'),
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .critical({
      replace: '%INLINE_CSS%',
      criticalOptions: {
        html: app.path('public/index.html'),
        base: '/',
      },
    })
}
