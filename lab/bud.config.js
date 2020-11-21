const localFix = require('./localFix')
const snippets = require('./snippets')

const {bud} = require('@roots/bud')

bud
  .use([
    '@roots/bud-postcss',
    '@roots/bud-babel',
    '@roots/bud-react',
  ])
  .pipe([localFix])

bud.alias({'@scripts': './scripts'})
bud.entry('foo', ['foo.js', 'foo.css'])
bud.template({
  replacements: {
    APP_TITLE: 'Foo bar',
  },
})

bud.run()
