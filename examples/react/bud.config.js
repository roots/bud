// @ts-check
const {bud} = require('../../packages/@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  require('path').resolve('./../../node_modules'),
])

const target = {
  dev: ({use}) =>
    use([
      require('@roots/bud-babel'),
      require('@roots/bud-react'),
    ]),
  prod: ({use}) =>
    use(require('@roots/bud-esbuild'))
      .esbuild.jsx()
      .hash()
      .minify(),
}

bud
  .when(bud.isDevelopment, target.dev, target.prod)
  .use([
    require('@roots/bud-emotion'),
    require('@roots/bud-postcss'),
  ])
  .html({
    template: 'public/index.html',
  })
  .entry({app: 'app.{js,css}'})
  .run()
