/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')

/**
 * Modes
 */

// Build mode
bud.mode.set('production') // manually trigger production mode
bud.mode.set('development') // manually trigger development mode
bud.mode.set('none') // explicitly leave mode unspecified

// Run Bud in CI (flag: --ci)
bud.features.enable('ci') // bud's rich terminal experience does not work in the absence of rawMode.
bud.features.disable('ci') // the ci flag simplifies bud's output for those environments

/**
 * Hooks
 */

// Modify entrypoints
bud.hooks.filter('webpack.entry', entry => ({
  ...entry,
  entrypoint: ['script.js'],
}))

// modify the webpack module rules
bud.hooks.on('webpack.module.rules', rules => rules)

// Modify externals
bud.hooks.on('webpack.externals', externals => ({
  ...externals,
}))

// Modify the CSS loaders
bud.hooks.on('webpack.module.rules.css.use', loaders => [
  ...loaders,
])

// etc. there are hundreds of filters.

/**
 * Config API
 */

// Add a new function to bud
bud.apply('newFunction', function (option = 'fallback') {
  this.fs.write('example.md', option)
  return this
})

// call the function we just added
bud.newFunction('test')

/**
 * Server
 */

bud.hooks.on('server.use', (req, res, next) => {
  // add middleware to the development server
  next()
})

/**
 * Containers
 *
 * Options, Features, Environment vars, Loaders, Arguments
 */

console.log(bud.options.entries()) // get all options

bud.options.get('webpack') // get all webpack options
bud.options.get('webpack.entry') // get webpack entry options
bud.options.set('webpack.optimization.splitChunks.minChunks', 5) // set an option directly
bud.options.merge('webpack.entry', {new: ['example']}) // merge options
bud.options.delete('webpack.entry.new') // delete an option
bud.options.is('webpack.entry', {new: 'test'}) // do a conditional check on an option value
bud.options.has('webpack.entry') // do a conditional check on if an option exists
bud.options.set('custom.value', ['value', 500]) // new options can be added by just attempting to set something that doesn't exist
bud.options.map('custom.value', entry => entry) // map values to a function callback

bud.features.set('hot', true) // toggle a feature on
bud.features.enable('hot') // in a couple different ways

bud.env.has('SOME_ENV_VALUE') // read & write env values

bud.features.set('hot', false) // toggle a feature off
bud.features.disable('hot') // in a couple different ways

bud.args.entries() // all command-line arguments

bud.loaderModules.entries() // loader modules (style-loader, babel-loader, etc.)
bud.loaderModules.set('custom-loader', 'my-custom-loader') // add a new loader to the repository

bud.loaders.get('babel') // babel loader
bud.loaders.merge('babel.options.plugins', ['some-plugin']) // merge babel plugins
bud.loaders.merge('postcss.options.plugins', ['postcss-plugin']) // merge postcss plugins

bud.patterns.get('ts') // regular expression matching typescript
bud.patterns.get('cssModules') // regular expression matching css modules

// create your own container
bud.customContainer = new bud.container({
  initial: 'values',
  passed: ['to', 'constructor'],
})

bud.customContainer.get('passed') // => ['to', 'constructor']

/**
 * Filesystem
 */

// get the absolute path to the package.json file
const pathToPackage = bud.fs.get('package.json')

// get a file as a string
let currentFile = bud.fs.read('bud.config.js')

// get package.json as an object
let package = bud.fs.readJson('package.json')

// modify the object
package.features = 'example'

// write the modified package.json to disk
bud.fs.writeJson('package.json', package)

// If you want it to be pretty printed --
bud.fs.write(
  'package.json',
  bud.util.pretty(JSON.stringify(package), 'json'), // run the output through prettier
)

/**
 * Utilities
 */

bud.dump(bud.options.get('server')) // dump values to terminal. syntax highlighting if possible

console.log(
  bud.util.highlight('{json: "config file hypothetical"}'),
) // syntax highlighter used by bud.dump

someFn = () => someFn()
console.log(bud.util.format(someFn)) // safely log objects even if they are wiley/recursive

bud.util.notify({
  title: 'ding',
  message: 'message text',
  sound: false,
}) // system level notification

bud.terminate() // shutdown this instance of bud

/**
 * Run Webpack manually
 */

bud.dump(bud.config(bud)) // view the object bud will pass to webpack
module.exports = bud.config(bud) // instead of bud.compile() as seen in other examples
