const WordPressPreset = require('@roots/bud-preset-wordpress')

module.exports = app =>
  app
    .use(WordPressPreset)
    .entry({
      app: ['app.js', 'app.css'],
      editor: ['editor.js'],
    })
    .when(app.isProduction, app => app.hash().runtime('single'))
    .proxy()
