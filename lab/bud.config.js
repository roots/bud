const {bud} = require('@roots/bud')

bud.pipe([
  ({use}) => use([
    '@roots/bud-postcss',
    '@roots/bud-babel',
    '@roots/bud-react',
    '@roots/bud-purgecss',
  ]),
  require('./localFix'),
])

bud.buildCache(bud.project('storage/bud/records.json'))
bud.purge(bud.presets.get('purgecss.wp'))
bud.alias({'@scripts': './scripts'})
bud.entry('foo', ['foo.js', 'foo.css'])
bud.vendor()
bud.runtime()
bud.template()

bud.run()
