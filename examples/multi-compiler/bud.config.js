module.exports = app => {
  app
    .use(require('@roots/bud-esbuild'))
    .setPath('dist', 'dist/global')
    .entry('global', ['global.js', 'global.css'])

    .make('theme', theme =>
      theme
        .use([
          require('@roots/bud-babel'),
          require('@roots/bud-entrypoints'),
        ])
        .setPath('dist', 'dist/theme')
        .entry('theme', ['theme.js', 'theme.css']),
    )

    .make('plugin', plugin =>
      plugin
        .use([
          require('@roots/bud-babel'),
          require('@roots/bud-entrypoints'),
        ])
        .setPath('dist', 'dist/plugin')
        .entry('plugin', ['plugin.js', 'plugin.css']),
    )

  console.log(
    app.children
      .getValues()
      .map(
        ({extensions}) =>
          extensions.get('webpack-manifest-plugin').make,
      ),
  )

  console.log(app.hooks.filter('location/dist'))
  console.log(
    app.children.get('plugin').hooks.filter('location/dist'),
  )
}
