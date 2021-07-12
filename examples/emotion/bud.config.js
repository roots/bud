const babel = require('@roots/bud-babel')
const react = require('@roots/bud-react')
const emotion = require('@roots/bud-emotion')

module.exports = app =>
  app
    .use([babel, react, emotion])
    .template({
      template: 'public/index.html',
    })
    .entry('app', 'app.js')
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks()
    })
