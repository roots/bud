/* eslint-disable @typescript-eslint/no-var-requires */
const build = require('@roots/bud')

build
  .extend([
    require('@roots/bud-sass'),
    require('@roots/bud-purgecss').plugin,
  ])
  .bundle('app', [build.src('app.scss')])
  .purgecss({
    content: ['./**/*.html'],
    options: {
      whitelist: ['container'],
      whitelistPatterns: [/^d(-.*)?$/, /^mr(-.*)?$/],
    },
  })
  .compile()
