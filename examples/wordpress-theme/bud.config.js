const babel = require('@roots/bud-babel')
const postcss = require('@roots/bud-postcss')
const react = require('@roots/bud-react')
const dependencies = require('@roots/bud-wordpress-dependencies')
const externals = require('@roots/bud-wordpress-externals')
const manifests = require('@roots/bud-wordpress-manifests')
const entrypoints = require('@roots/bud-entrypoints')

module.exports = app =>
  app
    .use([
      babel,
      postcss,
      react,
      dependencies,
      externals,
      manifests,
      entrypoints,
    ])
    .entry({
      app: ['app.js', 'app.css'],
      editor: ['editor.js'],
    })
    .when(app.isProduction, app => app.hash().runtime('single'))
    .proxy()
