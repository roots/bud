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

bud.purge(bud.presets.get('purgecss.wp'))

bud.publicPath('app/themes/sage/dist')
bud.alias({'@scripts': './scripts'})

bud.entry('foo', ['foo.js', 'foo.css'])

bud.hash()
bud.minify()
bud.vendor()
bud.runtime()

bud.hash()
bud.template()

bud.imagemin()

bud.imagemin([
  ['gifsicle', {interlaced: true}],
  ['jpegtran', {progressive: true}],
  ['optipng', {optimizationLevel: 5}],
  [
    'svgo',
    {
      plugins: [
        {
          removeViewBox: false,
        },
      ],
    },
  ],
])

bud.run()
