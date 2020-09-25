/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([
    require('@roots/bud-react'),
    require('@roots/bud-vue'),
  ])
  .bundle('create-bud-app', [build.src('app.js')])
  .bundle('create-bud-vue', [build.src('app.vue')])
  .compile()
