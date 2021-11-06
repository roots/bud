const {factory} = require('@roots/bud')
const postcss = require('@roots/bud-postcss')

;(async () => {
  const bud = await factory({mode: 'production'})
  await bud.use(postcss)
  bud.entry('app', 'index.js').minimize().splitChunks().run()
})()
