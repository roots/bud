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

/**
 * Target node env
 */
bud.hooks.on('webpack.target', () => 'node')

/**
 * Log some information about the first registered rule
 */
bud.hooks.on('webpack.module.rules', rules => {
  console.log({...rules.pop().oneOf.pop().use.pop()})
})

/**
 * Register an extension inline to check for tsconfig.json
 */
bud.extensions.add('tsconfig-checker', {
  register: bud => {
    !bud.disk.get('project').has('tsconfig.json') &&
      bud.disk.fs.writeJsonSync(bud.project('error.json'), {
        title: 'misconfiguration',
        body: 'no tsconfig.json was found',
      })
  },
})

/**
 * Log the first webpack module rule
 */
console.log(bud.extensions.getEntries())

/**
 * If an error.json file was outputted above, fail the build.
 */
bud.disk.fs.readJsonSync(bud.project('error.json')) &&
  bud.hooks.on('webpack.entry', entry => {
    console.log('no tsconfig found')
  })

/**
 * All bud files require at least on entrypoint.
 */
bud.run()
