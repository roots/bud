/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('@roots/bud')

bud
  .extend([require('@roots/bud-tailwindcss')])
  .bundle('example', [bud.src('app.css')])
  .compile()
