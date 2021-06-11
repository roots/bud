const babel = require('@roots/bud-babel')
const postcss = require('@roots/bud-postcss')
const react = require('@roots/bud-react')

const extensions = [babel, postcss, react]

module.exports = app => {
  return app
    .use(extensions)
    .template({
      template: 'public/index.html',
    })
    .entry({
      app: ['app.{js,css}'],
    })
    .when(app.isProduction, () => {
      app.runtime('single').splitChunks()
    })
}
