// @ts-check

/**
 * @typedef {import('@roots/bud').Framework} Bud
 * @typedef {import('@roots/bud-babel')} Babel
 */

/**
 * @const {Babel} babel
 */
const babel = require('@roots/bud-babel')

/**
 * @param {Bud} app
 */
module.exports = app => {
  app
    .use([babel])
    .tap(app => {
      app.babel
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
    .splitChunks()
    .minimize()
}
