/**
 * React configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(app: Bud): Bud}
 */

module.exports = app => {
  return app
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-react'),
      require('@roots/bud-terser'),
    ])
    .html({
      template: 'public/index.html',
    })
    .entry({
      app: {
        import: 'app.{js,css}',
        dependOn: ['react'],
      },
    })
    .when(app.isProduction, () => {
      app.runtime().splitChunks()
    })
    .persist({
      type: 'memory',
    })
}
