module.exports = app =>
  app
    .use([require('@roots/bud-esbuild')])
    .html()
    .entry('scripts/app', 'app.js')
    .runtime()
    .splitChunks()
    .hash()
