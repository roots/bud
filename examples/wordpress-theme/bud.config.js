// @ts-check
const {bud: app} = require('../../packages/@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
app.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, app.project('./../../node_modules')]
})

app.publicPath(app.env.get('APP_PUBLIC'))

app.isDevelopment &&
  app.use([
    require('@roots/bud-babel'),
    require('@roots/bud-react'),
  ])

app.isProduction &&
  app
    .use(require('@roots/bud-esbuild'))
    .esbuild.jsx()
    .hash()
    .vendor(),
  app
    .use([
      require('@roots/bud-postcss'),
      require('@roots/bud-entrypoints'),
      require('@roots/bud-wordpress-externals'),
      require('@roots/bud-wordpress-dependencies'),
      require('@roots/bud-wordpress-manifests'),
    ])
    .proxy()
    .entry('bud-app', ['app.js', 'app.css'])
    .entry('bud-editor', ['editor.js'])
    .run()
