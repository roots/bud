/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([require('@roots/bud-typescript')])
  .bundle('bud-typescript-app', [build.src('app.ts')])
  .compile()
