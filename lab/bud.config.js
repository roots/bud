/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud')

bud.bundle('app', ['foo.js'])
bud.on('build.module.parser', () => {})

bud.distPath('free')
console.log(bud.src(), bud.dist(), bud.project())
