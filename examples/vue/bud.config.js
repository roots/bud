// @ts-check
/**
 * Tailwind configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud) => Bud}
 */

module.exports = app =>
  app
    .use(require('@roots/bud-vue'))
    .entry('app', ['app.vue'])
    .minify(false)
    .run()
