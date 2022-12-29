module.exports = async app => {
  app.entry({app: ['app.js', 'app.css']}).when(app.isProduction, () => {
    app.runtime('single').splitChunks().minimize()
  })
}
