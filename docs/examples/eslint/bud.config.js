const {bud} = require('@roots/bud')

bud
  .use('@roots/bud-eslint')
  .bundle('example', [bud.src('app.js')])
  .compile()
