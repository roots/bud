/* eslint-disable @typescript-eslint/no-var-requires */
require('@roots/bud')
  .bundle('app', ['./app.js', './style/app.css'])
  .compile()
