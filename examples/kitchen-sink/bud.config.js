/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([
    require('@roots/bud-react'),
    require('@roots/bud-typescript'),
    require('@roots/bud-vue'),
    require('@roots/bud-purgecss').plugin,
    require('@roots/bud-sass'),
  ])
  .bundle('big-boy', [
    build.src('app.ts'),
    build.src('vue.vue'),
    build.src('react.js'),
    build.src('app.scss'),
  ])
  .purgecss({
    options: {
      whitelist: ['whitelisted'],
    },
  })
  .mini()
  .hash()
  .gzip()
  .runtimeManifest()
  .vendor()
  .compile()
