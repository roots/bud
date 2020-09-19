/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')

bud
  .bundle('app', [bud.src('app.js'), bud.src('style/app.css')])
  .compile()
