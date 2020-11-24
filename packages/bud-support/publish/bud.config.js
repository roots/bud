// eslint-disable-next-line
const bud = require('@roots/bud')

bud
  .entry('app', ['index.js'])
  .template()
  .when(bud.mode.is('production'), () => bud.minify())
  .run()
