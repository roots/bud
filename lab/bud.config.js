/* eslint-disable @typescript-eslint/no-var-requires */
const bud = require('../packages/bud/lib')

bud
  .extensions
    .use('@roots/bud-eslint')
    .use('@roots/bud-babel')
    .use('@roots/bud-sass')

    console.log(bud.babel)

bud.babel.init()
  .mergePlugins([
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ])

  /**
   *  .setPresets([
    ['@babel/preset-env', {modules: false}],
  ])
   */

bud.entry('foo', ['foo.js'])

Object.values(bud.build.items.babel.options).map(item => console.log(item))
