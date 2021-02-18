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

bud
  .makeContainer({
    development: () =>
      bud.use([
        require('@roots/bud-babel'),
        require('@roots/bud-react'),
      ]),
    production: () => {
      bud.use([require('@roots/bud-esbuild')]).esbuild.jsx()
      bud.hash().minify()
    },
  })
  .get(bud.mode)

bud.use([
  require('@roots/bud-emotion'),
  require('@roots/bud-postcss'),
])

bud.html({
  template: 'public/index.html',
})

bud.theme.colors({
  foreground: '#FFFFFF',
  faded: '#6C758F',
  primary: '#545DD7',
  primaryAlt: '#663399',
  error: '#dc3545',
  errorAlt: '#b22222',
  warning: '#FF611A',
  success: '#46D46A',
  accent: '#ff69b4',
  flavor: '#78C5D7',
})

bud.entry({app: '**/*.{js,css}'}).run()
