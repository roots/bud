// @ts-check

/**
 * @typedef {import('@roots/bud').Bud} Bud
 *
 * @param {Bud} app
 */
module.exports = app =>
  app
    .template({
      template: app.path('project', 'public/index.html'),
      replace: {
        APP_TITLE: 'Demo',
        APP_DESCRIPTION: 'html templating example',
      },
      favicon: 'public/favicon.ico',
    })
    .define({
      APP_TITLE: 'Demo',
      APP_DESCRIPTION: 'html templating example',
    })
    .entry('app', 'index.js')
