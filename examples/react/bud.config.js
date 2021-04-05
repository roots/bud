/**
 * React configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = bud =>
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-react'),
    ])
    .html({
      enabled: true,
      template: bud.project('public/index.html'),
    })
    .entry('app', 'app.{js,css}')
