/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')
build.bundle('app', [build.src('app.js')]).compile()
