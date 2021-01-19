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

bud.library(['react', 'react-dom', 'vue'])

bud
  .entry('create-bud-app', ['app.js', 'global.css'])
  .entry('create-vue-bud', ['components/test.vue'])
  .entry('create-ts-bud', ['test.ts'])
  .run()
