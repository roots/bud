module.exports = app =>
  app
    .use(require('@roots/bud-babel'))
    .html()
    .entry({
      scripts: '*.js',
      styles: '*.css',
    })
    .persist({type: 'memory'})
