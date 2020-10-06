/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')
bud.entry('app', 'foo.js')

console.log(bud.build().optimization)
bud.compile()
