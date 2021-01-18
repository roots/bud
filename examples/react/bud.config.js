// @ts-check
const {bud} = require('@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, bud.project('./../../node_modules')]
})

bud.use([
  require('@roots/bud-entrypoints'),
  require('@roots/bud-babel'),
  require('@roots/bud-postcss'),
  require('@roots/bud-react'),
  require('@roots/bud-imagemin'),
  require('@roots/bud-tailwindcss'),
  require('@roots/bud-library'),
  require('@roots/bud-terser'),
  require('@roots/bud-vue'),
  require('@roots/bud-wordpress-manifests'),
])

bud.library(['react', 'react-dom', 'vue'])

bud
  .entry('create-bud-app', ['app.js', 'global.css'])
  .entry('create-vue-bud', ['components/test.vue'])
  .run()
