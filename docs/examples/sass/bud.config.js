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
  // @ts-ignore
  ...modules,
  bud.fs.path.join(bud.fs.base, './../../../node_modules'),
])

/**
 * Extensions
 */
bud.use(['@roots/bud-babel', '@roots/bud-postcss'])

/**
 * Set application source files.
 */
bud.entry('app', ['app.js', 'app.css'])

/**
 * Run build.
 */
bud.run()
