/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')
bud.bundle('app', 'foo.js')

console.log(bud.store.build.optimization)
console.log(bud.store.use('build').get('optimization'))
console.log(bud.components)
