module.exports = async app =>
  app
    .entry({
      app: ['app.js', 'app.css'],
      editor: ['editor.js'],
    })
    .when(app.isProduction, app => app.hash().runtime('single'))
    .proxy()
