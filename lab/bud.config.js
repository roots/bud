/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')

bud.bundle('app', ['foo.js'])
bud.compile()
