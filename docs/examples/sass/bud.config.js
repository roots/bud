/* eslint-disable @typescript-eslint/no-var-requires */
const {bud} = require('@roots/bud')

bud
  .extend([require('@roots/bud-sass')])
  .bundle('example', [bud.src('app.scss')])
  .compile()
