/**
 * PostCSS configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = app => {
  app
    .use([
      require('@roots/bud-postcss'),
      require('../../node_modules/@roots/bud-sass'),
    ])
    .entry('app', ['app.scss'])

  console.log(app.build.make())
  console.log(app.build.make().module.rules[0].oneOf[6].use[4])

  return app
}
