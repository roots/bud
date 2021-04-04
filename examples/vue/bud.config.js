// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

app
  .use(require('@roots/bud-vue'))
  .entry('app', ['app.vue'])
  .minify(false)
  .run()
