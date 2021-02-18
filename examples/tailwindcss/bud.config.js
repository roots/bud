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

bud.use([
  require('@roots/bud-postcss'),
  require('@roots/bud-sass'),
  require('@roots/bud-tailwindcss'),
])

bud.html({
  template: bud.project('public/index.html'),
})

bud.entry('bud-tailwind', ['app.scss', 'editor.scss']).run()
