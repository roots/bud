module.exports = app =>
  app
    .when(app.isDevelopment, app =>
      app.use([
        require('@roots/bud-babel'),
        require('@roots/bud-react'),
      ]),
    )
    .when(app.isProduction, app =>
      app
        .use(require('@roots/bud-esbuild'))
        .esbuild.jsx()
        .hash()
        .splitChunks()
        .runtime('single'),
    )
    .use([
      require('@roots/bud-postcss'),
      require('@roots/bud-wordpress-dependencies'),
      require('@roots/bud-wordpress-externals'),
      require('@roots/bud-wordpress-manifests'),
      require('@roots/bud-entrypoints'),
    ])
    .proxy()
    .entry({
      app: ['app.js', 'app.css'],
      editor: ['editor.js'],
    })
