// @ts-check

const babel = require('@roots/bud-babel')

/**
 * @function config
 * @param {import('@roots/bud').Bud} app
 */
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
    .entry('app', '*.{js,css}')

  console.log(app.build.config.module.rules[1].oneOf[9])
}
