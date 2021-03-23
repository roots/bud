// @ts-check
const {bud} = require('./../../packages/@roots/bud')

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
bud.extensions.add({
  name: 'ts-config-checker',
  register: bud => {
    !bud.disk.get('project').has('tsconfig.json') &&
      bud.fs.writeJsonSync(bud.project('error.json'), {
        title: 'misconfiguration',
        body: 'no tsconfig.json was found',
      })
  },
})

console.log(bud.extensions.getEntries())

bud.fs.readJsonSync(bud.project('error.json')) &&
  bud.hooks.on('webpack.entry', entry => {
    console.log('no tsconfig found')
  })

bud.run()
