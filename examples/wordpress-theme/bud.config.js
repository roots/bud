module.exports = app =>
  app
    .when(
      app.isDevelopment,
      () =>
        app.use([
          require('@roots/bud-babel'),
          require('@roots/bud-react'),
        ]),
      () =>
        app
          .use(require('@roots/bud-esbuild'))
          .esbuild.jsx()
          .hash()
          .splitChunks()
          .runtime(),
    )
    .use([
      require('@roots/bud-postcss'),
      require('@roots/bud-entrypoints'),
    ])

    .proxy()
    .entry('app', ['app.js', 'app.css'])
    .entry('editor', ['editor.js'])
