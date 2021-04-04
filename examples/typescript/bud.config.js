// @ts-check
/**
 * Tailwind configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud) => Bud}
 */

module.exports = bud =>
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-typescript'),
    ])
    .entry({app: ['app.ts']})
    .html()
