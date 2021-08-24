const babel = require('@roots/bud-babel')
const postcss = require('@roots/bud-postcss')
const react = require('@roots/bud-react')

module.exports = app =>
  app
    .use([babel, postcss, react])
    .template({
      template: 'public/index.html',
    })
    .entry({
      app: ['app.{js,css}'],
    })
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks()
    })
