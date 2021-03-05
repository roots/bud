// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
app.hooks.on('webpack.resolve.modules', modules => {
  return [...modules, app.project('./../../node_modules')]
})

app.use([require('@roots/bud-esbuild')])
app.entry('scripts/app', '*.{js,jsx,ts,tsx}')
app.run()
