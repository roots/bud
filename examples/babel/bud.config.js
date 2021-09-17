// @ts-check

const babel = require('@roots/bud-babel')

module.exports = app => {
  app
    .use(babel)
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
    .template()
    .entry('app', '*.{js,css}')
}
