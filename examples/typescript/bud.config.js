// @ts-check
const {bud} = require('../../packages/@roots/bud')

bud
  .use([
    require('@roots/bud-babel'),
    require('@roots/bud-typescript'),
  ])
  .entry('app', ['app.ts'])
  .typecheck()
  .html()
  .run()
