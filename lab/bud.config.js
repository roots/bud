/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')

bud
  .extensions
    .use('@roots/bud-eslint')
    .use('@roots/bud-babel')
    .use('@roots/bud-sass')

    console.log(bud.babel)

/**
 * Babel API
 */
bud.babel
  /**
   * Merge plugins
   */
  .mergePlugins([
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ])
  /**
   * Completely overwrite plugins.
   */
  .setPlugins(['@babel/plugin-syntax-dynamic-import'])
  /**
   * Add a single plugin
   */
  .addPlugin(
    '@babel/plugin-proposal-object-rest-spread',
    {options: 'some'},
  )

  /**
   * Same API for presets
   */
  .setPresets([
    ['@babel/preset-env', {modules: false}],
  ])
  .mergePresets([
    ['@babel/preset-env'],
  ])
  .addPreset('babel/preset-env', {module: false})
  .next()


/**
 * Bundle files.
 */
bud.entry('foo', ['foo.js'])

Object.values(bud.build.items.babel.options).map(item => console.log(item))
