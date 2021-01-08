// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {bud} = require('@roots/bud')

/**
 * This is specific for the Bud monorepo only.
 *
 * You do not need to include this hook in your project
 * configuration file.
 */
bud.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  bud.disk.path.join(
    bud.disk.baseDir,
    './../../../node_modules',
  ),
])

// @ts-ignore
bud.use('@roots/bud-sass')

/**
 * Set application source files.
 */
bud.entry('app', ['app.js', 'app.scss'])

/* bud.build.loaders
  .getEntries()
  .forEach(loader => console.log(loader))

process.exit() */

/**
 * Run build.
 */
bud.run()
