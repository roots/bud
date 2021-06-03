module.exports = app =>
  app
    .use([require('@roots/bud-eslint')])
    .template()
    .entry('app', 'app.js')
