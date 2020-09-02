const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

test('has expected copy defaults', t => {
  t.deepEqual(bud.options.get('webpack.plugins.copy'), {
    patterns: [],
  })
})

test('has expected devtool defaults', t => {
  t.deepEqual(bud.options.get('webpack.devtool'), 'source-map')
})

test('has expected resolve defaults', t => {
  t.deepEqual(bud.options.get('webpack.resolve'), {
    alias: false,
    extensions: ['.css', '.js', '.json', '.svg'],
  })
})

test('has expected filenameTemplate defaults', t => {
  t.deepEqual(bud.options.get('filenameTemplate'), {
    default: '[name]',
    hashed: '[name].[hash:8]',
  })
})

test('has expected optimization.runtimeChunk defaults', t => {
  t.truthy(bud.options.get('webpack.optimization.runtimeChunk'))
})

test('has two postcss plugins by default', t => {
  t.true(bud.options.get('postcss.plugins').length == 2)
})

test('has expected splitting defaults', t => {
  t.deepEqual(bud.options.get('splitting'), {
    maxChunks: 9999,
  })
})

test('has expected target defaults', t => {
  t.deepEqual(bud.options.get('webpack.target'), 'web')
})

test('has expected terser defaults', t => {
  t.deepEqual(bud.options.get('webpack.plugins.terser'), {
    cache: true,
    parallel: true,
    terserOptions: {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
  })
})
