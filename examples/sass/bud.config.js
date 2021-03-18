// @ts-check
const {
  bud,
} = require('./../../packages/@roots/bud-preset-recommend')

bud
  .use(require('@roots/bud-sass'))
  .entry('app', ['app.scss'])
  .run()
