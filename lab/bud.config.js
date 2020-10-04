/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')

bud.bundle('app', ['foo.js'])
bud.bundle('library', ['foo.js'])
bud.on('build.module.parser', () => {})

bud.distPath('free')
console.log(bud.src(), bud.dist(), bud.project())

bud.store.build.mode = 'production'
console.log(bud.store.build.mode)
bud.store.build.set('mode', 'none')
console.log(bud.build())
bud.compile()
