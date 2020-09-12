/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([require('@roots/bud-react')])
  .bundle('create-bud-app', [build.src('app.js')])
  .compile()
