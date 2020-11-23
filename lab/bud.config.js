require('@roots/bud')
  .use([
    '@roots/bud-postcss',
    '@roots/bud-babel',
    '@roots/bud-react',
    '@roots/bud-purgecss',
  ])
  .pipe([
    require('./localFix'),
    bud => bud.buildCache(bud.project('storage/bud/records.json')),
    ({purge, presets}) =>  purge(presets.get('purgecss.wp')),
    ({alias}) => alias({'@scripts': './scripts'}),
    ({entry}) => entry('foo', ['foo.js', 'foo.css']),
    ({vendor}) => vendor(),
    ({runtime}) => runtime(),
    ({template}) => template(),
  ])
  .run()
