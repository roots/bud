/**
 * React configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = bud => {
  return bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-react'),
    ])
    .html({
      enabled: true,
      template: bud.path('project', 'public/index.html'),
    })
    .entry('app', 'app.{js,css}')
    .when(bud.isProduction, bud =>
      bud.runtime().splitChunks().minimize(),
    )
    .persist({
      type: 'memory',
    })
}
