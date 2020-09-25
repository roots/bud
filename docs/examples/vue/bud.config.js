/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([require('@roots/bud-vue')])
  .bundle('vue-app', [build.src('app.vue')])
  .compile()
