const babel = require('@roots/bud-babel')
const esbuild = require('@roots/bud-esbuild')

module.exports = {
  parent: app =>
    app.use(esbuild).entry('app', ['app.js', 'app.css']),

  theme: app =>
    app.use(babel).entry('theme', ['theme.js', 'theme.css']),

  plugin: app =>
    app
      .use(esbuild)
      .entry('plugin', ['plugin.js', 'plugin.css']),
}
