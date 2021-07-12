module.exports = app =>
  app
    .template({
      favicon: app.path('src', 'favicon.ico'),
      minify: false,
      replace: {
        APP_TITLE: 'Demo',
        APP_DESCRIPTION: 'html templating example',
      },
    })
    .entry('app', 'index.js')
