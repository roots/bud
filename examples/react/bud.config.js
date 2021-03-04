// @ts-check
const {
  bud,
} = require('../../packages/@roots/bud-preset-recommend')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  bud.disk.path.resolve('./../../node_modules'),
])

bud
  .when(
    bud.isDevelopment,
    ({use}) =>
      use([
        require('@roots/bud-babel'),
        require('@roots/bud-react'),
      ]),
    ({use}) =>
      use(require('@roots/bud-esbuild'))
        .esbuild.jsx()
        .hash()
        .minify(),
  )
  .dev({port: 3000})
  .use([
    require('@roots/bud-emotion'),
    require('@roots/bud-postcss'),
  ])
  .html({
    template: 'public/index.html',
  })
  .entry({app: 'app.{js,css}'})
  .run()
