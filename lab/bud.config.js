const bud = require('../packages/bud/lib')

bud.extensions
  .use('@roots/bud-eslint')
  .use('@roots/bud-sass')
  .use('@roots/bud-babel')
    .next()

.css
  .addPlugin('postcss-import', require('postcss-import'))
  .mergePlugins({
    'postcss-import': require('postcss-import'),
  })
  .setPlugins({
    'postcss-import': require('postcss-import'),
  })
  .mergeConfig({
    syntax: 'sass',
  })
  .setConfig({
    plugins: {
      'postcss-import': require('postcss-import'),
    },
  })
  .setParser('sugarss')
  .setSyntax('sass')
  .next()

/**
 * Babel configuration API usage
 */
.babel
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
  .setPlugins([
    '@babel/plugin-syntax-dynamic-import'
  ])

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
    'babel/preset-env', // no options? a string works.
  ])

  .mergePresets([
    ['@babel/preset-env'],
  ])

  .addPreset('babel/preset-env')

  /**
   * call next to continue chaining with bud
   */
  .next()

/**
 * Set entrypoint.
 */
.entry('foo', ['foo.js'])

/**
 * 👀
 */
Object
  .values(bud.build.items.babel.options)
  .map(item => console.log(item))
