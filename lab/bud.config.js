require('@roots/bud')
  .use([
    '@roots/bud-postcss',
    '@roots/bud-babel',
    '@roots/bud-react',
  ])
  .pipe([
    require('./localFix'),
    ({alias}) => alias({'@scripts': './scripts'}),
    ({entry}) => entry('foo', ['foo.js', 'foo.css']),
    ({template}) => template(),
  ])
  .run()
