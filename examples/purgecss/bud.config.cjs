module.exports = async app =>
  app
    .template({template: 'public/index.html'})
    .entry({app: 'app.css'})
    .purgecss({
      content: [app.path('public/*.html')],
      css: [app.path('src/**/*.css')],
    })
