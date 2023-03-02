module.exports = async app => {
  app
    .html({
      template: app.path('public/index.html'),
    })
    .entry('app', 'app.js')
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks().minimize()
    })
}
