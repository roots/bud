module.exports = app =>
  app
    .use(require('@roots/bud-babel'))
    .tap(({babel}) => {
      babel
        .setPresets(['@babel/preset-env'])
        .setPlugins([
          ['@babel/plugin-transform-runtime', {helpers: false}],
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-proposal-class-properties',
        ])
    })
    .entry('app', '*.{js,css}')
