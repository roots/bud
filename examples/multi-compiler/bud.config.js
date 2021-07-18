module.exports = app =>
  app
    .use([require('@roots/bud-babel')])
    .setPath('dist', 'dist/global')
    .entry('global', ['global.js', 'global.css'])

    .make('theme', theme =>
      theme
        .use([require('@roots/bud-babel')])
        .setPath('dist', 'dist/theme')
        .entry('theme', ['theme.js', 'theme.css']),
    )
    .make('plugin', plugin =>
      plugin
        .use([require('@roots/bud-babel')])
        .setPath('dist', 'dist/plugin')
        .entry('plugin', ['plugin.js', 'plugin.css']),
    )
