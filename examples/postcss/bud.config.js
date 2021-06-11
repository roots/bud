module.exports = app =>
  app
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
    ])
    .template({
      template: 'public/index.html',
    })
    .entry({
      app: ['app.css'],
    })
