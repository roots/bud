/**
 * Tailwind configuration example
 *
 * @typedef {import('@roots/bud').Bud & import('@roots/bud-framework').Framework} Bud
 * @type {(bud: Bud): Bud}
 */
module.exports = bud =>
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
      require('@roots/bud-entrypoints'),
    ])
    .entry('app', ['app.css', 'app.js'])
    .html()
    .hooks.on('', () => )
