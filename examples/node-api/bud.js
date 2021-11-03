const {factory} = require('@roots/bud')

;(async () => {
  const bud = await factory({mode: 'production'})
  bud.entry('app', 'index.js').minimize().splitChunks()
})()
