/**
 * ESBuild configuration example
 *
 * @typedef {import('@roots/bud').Bud} Bud
 * @type {(bud: Bud): Bud}
 */

module.exports = app =>
  app
    .use([
      require('@roots/bud-esbuild'),
      require('@roots/bud-entrypoints'),
      require('@roots/bud-wordpress-dependencies'),
      require('@roots/bud-wordpress-externals'),
      require('@roots/bud-wordpress-manifests'),
    ])
    .html({enabled: true})
    .entry('scripts/app', 'app.js')
    .runtime()
    .splitChunks()
    .hash()
