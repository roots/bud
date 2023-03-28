module.exports = async app =>
  app
    .html({
      template: app.path('public/index.html'),
    })
    .entry({
      app: 'app.css',
    })
    .purgecss({
      content: [app.path('public/*.html')],
      css: [app.path('src/**/*.css')],
    })
