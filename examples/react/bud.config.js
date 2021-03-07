// @ts-check
const {
  app,
} = require('../../packages/@roots/bud-preset-recommend')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
app.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  app.disk.path.resolve('./../../node_modules'),
])

app
  .when(
    app.isDevelopment,
    ({use}) => use([require('@roots/bud-react')]),
    ({use}) =>
      use(require('@roots/bud-esbuild'))
        .esbuild.jsx()
        .hash()
        .minify(),
  )
  .dev({port: 3000})
  .use([require('@roots/bud-emotion')])
  .html({
    template: 'public/index.html',
  })
  .entry({app: 'app.{js,css}'})
  .run()
