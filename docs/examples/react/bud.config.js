/**
 * Example: React single page application
 */

const {bud} = require('@roots/bud')

// This fix only applies to the bud monorepo
// You do not need to include it in your project
require('../fix')
  .modulePath(bud, '../../../node_modules')


/**
 * Use babel and react extensions.
 */
bud.use([
  '@roots/bud-babel',
  '@roots/bud-react',
])

/**
 * Set application source files.
 */
bud.entry('create-bud-app', [
  'app.js',
  'global.css',
])

/**
 * Define `appName` variable used in components/index.js
 * Explicitly cast as a string to avoid errors.
 */
bud.define({
  'appName': bud.string(
    bud.env.get('APP_TITLE')
  ),
})

/**
 * Minify and code split production code.
 */
bud.when(
  bud.mode.is('production'),
  ({pipe}) => pipe([
    ({minify}) => minify(),
    ({vendor}) => vendor(),
    ({runtime}) => runtime(),
  ])
)

/**
 * Set HTML template
 */
bud.template({
  template: bud.project('public/index.html'),
})

/**
 * Run build.
 */
bud.run()
