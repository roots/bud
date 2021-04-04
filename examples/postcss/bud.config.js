/**
 * PostCSS configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = app =>
  app
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
    ])
    .html({
      template: 'public/index.html',
    })
    .entry('app', ['app.css'])
