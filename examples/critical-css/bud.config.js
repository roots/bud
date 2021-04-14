/**
 * ESBuild configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */
module.exports = bud =>
  bud
    .use([
      require('@roots/bud-entrypoints'),
      require('@roots/bud-criticalcss'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
    ])
    .html({
      template: 'public/index.html',
    })
    .critical({
      hash: true,
      replace: '%INLINE_CSS%',
      criticalOptions: {
        src: 'public/index.html',
      },
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .runtime()
