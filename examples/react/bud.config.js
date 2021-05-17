const babel = require('@roots/bud-babel')
const postcss = require('@roots/bud-postcss')
const react = require('@roots/bud-react')

const extensions = [babel, postcss, react]

module.exports = app =>
  app
    .use(extensions)
    .template({
      template: 'public/index.html',
    })
    .entry({
      react: ['react', 'react-dom', 'foo'],
      app: {
        import: ['app.{js,css}'],
        dependOn: ['react'],
      },
    })
    .when(app.isProduction, () => {
      app.runtime().splitChunks()
    })
    .persist({
      type: 'memory',
    })
