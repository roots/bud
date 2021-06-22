const babel = require('@roots/bud-babel')
const esbuild = require('@roots/bud-esbuild')

module.exports = app =>
  app
    .make('theme', theme =>
      theme
        .use(babel)
        .setPath('dist', dist => `${dist}/theme`)
        .entry('theme', ['theme.js', 'theme.css']),
    )

    .make('plugin', plugin =>
      plugin
        .use(esbuild)
        .setPath('dist', dist => `${dist}/plugin`)
        .entry('plugin', ['plugin.js', 'plugin.css']),
    )
