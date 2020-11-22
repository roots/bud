require('@roots/bud')
  .use([
    '@roots/bud-postcss',
    '@roots/bud-babel',
    '@roots/bud-react',
  ])
  .pipe([
    require('./localFix'),
    bud => bud.buildCache(bud.project('storage/bud/records.json')),
    ({alias}) => alias({'@scripts': './scripts'}),
    ({entry}) => entry('foo', ['foo.js', 'foo.css']),
    ({vendor}) => vendor(),
    ({runtime}) => runtime(),
    ({template}) => template(),
  ])
  .run()
