/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib/index')

bud.bundle('foo', 'foo')
console.log(bud.build().module.rules[1].oneOf.map(i => i.use))
