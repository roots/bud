const {bud} = require('@roots/bud')

require('./localFix')(bud)

bud.use([
  '@roots/bud-wordpress-manifests',
  '@roots/bud-postcss',
  '@roots/bud-babel',
  '@roots/bud-react',
  '@roots/bud-purgecss',
])

bud.buildCache(bud.project('storage/bud/records.json'))

bud.entrypoints({
  name: 'file.json',
})

bud.publicPath('app/themes/sage/dist')
bud.alias({'@scripts': './scripts'})

bud.entry('foo', ['foo.js', 'foo.css'])

bud.hash()
bud.imagemin()
bud.minify()
bud.vendor()
bud.runtime()

bud.template()

bud.run()
