module.exports = app =>
  app
    .setPath('dist', dist => `${dist}/app`)
    .use(require('@roots/bud-esbuild'))
    .entry('app', ['app.js', 'app.css'])

    .make('theme', theme =>
      theme
        .setPath('dist', dist => `${dist}/theme`)
        .use(require('@roots/bud-babel'))
        .entry('theme', ['theme.js', 'theme.css']),
    )

    .make('plugin', plugin =>
      plugin
        .setPath('dist', dist => `${dist}/plugin`)
        .use(require('@roots/bud-esbuild'))
        .entry('plugin', ['plugin.js', 'plugin.css']),
    )
