/* eslint-disable @typescript-eslint/no-var-requires */
const {bud} = require('@roots/bud')

// This fix only pertains to the bud monorepo
// You do not need to include it in your project
const fix = require('../fix')
fix.modulePath(bud, '../../../node_modules')

/**
 * Example: react single page application
 */
bud.use([
  '@roots/bud-babel',
  '@roots/bud-react',
])

bud
  .entry('create-bud-app', ['app.js'])
  .template()
  .run()
