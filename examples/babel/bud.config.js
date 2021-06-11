module.exports = app => {
  app.use(require('@roots/bud-babel')).template().entry({
    app: '*.{js,css}',
  })

  return app
}
