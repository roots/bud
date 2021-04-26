/**
 * ESBuild configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */
export default bud =>
  bud
    .use([
      require('@roots/bud-entrypoints'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
      require('@roots/bud-terser'),
    ])
    .html({
      template: 'public/index.html',
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .minimize()
