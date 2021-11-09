module.exports = async app => {
  app
    .template({
      template: 'public/index.html',
    })
    .entry({
      app: ['app.js', 'app.css'],
    })
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks().minimize()
    })
}
