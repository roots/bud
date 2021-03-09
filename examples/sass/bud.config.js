// @ts-check
const {
  app,
} = require('./../../packages/@roots/bud-preset-recommend')

app
  .use(require('@roots/bud-sass'))
  .entry('app', ['app.scss'])
  .run()
