const babel = require('@roots/bud-babel')
const esbuild = require('@roots/bud-esbuild')

module.exports = app =>
  app
    .use(esbuild)
    .entry('app', ['app.js', 'app.css'])

    .make('theme', theme =>
      theme.use(babel).entry('theme', ['theme.js', 'theme.css']),
    )

    .make('plugin', plugin =>
      plugin
        .use(esbuild)
        .entry('plugin', ['plugin.js', 'plugin.css']),
    )
