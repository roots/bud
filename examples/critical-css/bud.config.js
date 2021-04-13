/**
 * ESBuild configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */
module.exports = bud =>
  bud
    .use([
      require('@roots/bud-criticalcss'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
    ])
    .html({
      template: 'public/index.html',
    })
    .critical({
      src: 'public/index.html',
      hash: true,
    })
    .entry('app', 'app.css')
    .splitChunks()
