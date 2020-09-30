/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib/index')

const [webpack] = bud.store.query(['webpack'])

webpack.set('mode', 'production')
console.log(webpack.repository, bud.compiler.getConfig())

bud.bundle('foo', ['index.js'])
console.log(bud.store['server'], bud.store['webpack'], bud.server.getConfig(), bud.compiler.getConfig())
