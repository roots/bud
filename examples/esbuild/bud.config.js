module.exports = app =>
  app
    .use([require('@roots/bud-esbuild')])
    .template()
    .entry('scripts/app', 'app.js')
    .runtime()
    .splitChunks()
    .hash()
