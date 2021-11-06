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
        TITLE: 'Demo',
        DESCRIPTION: 'html templating example',
      },
      favicon: 'public/favicon.ico',
    })
    .define({
      TITLE: 'Demo',
      DESCRIPTION: 'html templating example',
    })
    .entry('app', 'index.js')
