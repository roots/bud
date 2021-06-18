module.exports = app => {
  app
    .entry({
      styles: '*.css',
    })
    .persist()

  app
    .make('babel')
    .use(require('@roots/bud-babel'))
    .template()
    .entry({
      app: ['app.js'],
    })
    .persist()

  return app
}
