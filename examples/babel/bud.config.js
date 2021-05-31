module.exports = app =>
  app
    .use(require('@roots/bud-babel'))
    .template()
    .entry({
      scripts: '*.js',
      styles: '*.css',
    })
    .persist()
