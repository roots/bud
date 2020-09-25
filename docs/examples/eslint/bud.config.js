const bud = require('@roots/bud')

bud
  .extend([require('@roots/bud-eslint').plugin])
  .bundle('example', [bud.src('app.js')])
  .compile()
