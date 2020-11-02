/* eslint-disable @typescript-eslint/no-var-requires */
import {build, hooks, mode} from '@roots/bud'

// Build mode
mode.set('production') // manually trigger production mode
mode.set('development') // manually trigger development mode
mode.set('none') // explicitly leave mode unspecified

// Modify entrypoints
hooks.filter('webpack.entry', entry => ({
  ...entry,
  entrypoint: ['script.js'],
}))

// modify the webpack module rules
hooks.on('webpack.module.rules', rules => rules)

// Modify externals
hooks.on('webpack.externals', externals => ({
  ...externals,
}))

// Modify the CSS loaders
hooks.on('webpack.module.rules.css.oneOf.use', loaders => [
  ...loaders,
])

hooks.on('server.use', (req, res, next) => {
  next()
})

console.log(build.config.all()) // webpack config

build.config.get('entry')
build.config.set('optimization.splitChunks.minChunks', 5)
build.config.merge('entry', {new: ['example']}) // merge options
build.config.delete('entry.new')
build.config.is('entry', {new: 'test'})
build.config.has('entry')
build.config.set('custom.value', ['value', 500])
build.config.map('custom.value', entry => entry) // map to fn callback

bud.env.has('SOME_ENV_VALUE') // read & write env values
bud.features.set('hot', false) // toggle a feature off
bud.features.disable('hot') // in a couple different ways

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
