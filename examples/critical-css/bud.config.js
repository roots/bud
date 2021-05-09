module.exports = bud =>
  bud
    .use([
      require('@roots/bud-entrypoints'),
      require('@roots/bud-postcss'),
      require('@roots/bud-tailwindcss'),
      require('@roots/bud-terser'),
      require('@roots/bud-criticalcss'),
    ])
    .html({
      template: 'public/index.html',
    })
    .critical({
      replace: '%INLINE_CSS%',
      criticalOptions: {
        html: 'public/index.html',
      },
    })
    .hash()
    .entry('app', ['app.css'])
    .entry('app2', ['app2.css'])
    .splitChunks()
    .minimize()
    .persist({type: 'memory'})
