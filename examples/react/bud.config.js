// @ts-check
const {bud} = require('./../../packages/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', function (modules) {
  return [
    ...modules,
    require('path').resolve('./../../node_modules'),
  ]
})

const dev = () =>
  bud.use([
    require('@roots/bud-babel'),
    require('@roots/bud-react'),
  ])

const prod = () => {
  bud.use([require('@roots/bud-esbuild')]).esbuild.jsx()
  bud.hash().minify()
}

bud.when(bud.isDevelopment, dev, prod)

bud.use([
  require('@roots/bud-emotion'),
  require('@roots/bud-postcss'),
])

bud.html({
  template: 'public/index.html',
})

bud
  .entry({
    app: '**/*.{js,css}',
  })
  .run()
