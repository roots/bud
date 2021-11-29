const {factory} = require('@roots/bud')
const postcss = require('@roots/bud-postcss')

;(async () => {
  /**
   * Use the factory export to create a bud instance
   */
  const bud = await factory({mode: 'production'})

  /**
   * Configure bud using normal config api
   */
  bud.entry('app', 'index.js').minimize().splitChunks()

  /**
   * Run compiler
   */
  await bud.run()
})()
