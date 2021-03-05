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
app.hooks.on('webpack.resolve.modules', function (modules) {
  return [
    ...modules,
    require('path').resolve('./../../node_modules'),
  ]
})

/**
 * To use tailwindcss with sass
 * include the sass extension BEFORE
 * the @roots/bud-tailwindcss extension
 */
// app.use(require('@roots/bud-sass'))

app
  .use(require('@roots/bud-tailwindcss'))
  .html({
    template: app.project('public/index.html'),
  })
  .entry('bud-tailwind', ['app.css'])
  .run()
