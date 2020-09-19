/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')

bud
  .projectPath(__dirname)
  .bundle('app', [bud.src('index.js')])
  .compile()
