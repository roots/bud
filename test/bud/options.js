const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected babel defaults', t => {
  t.deepEqual(bud.options.get('babel'), {
    plugins: [],
    presets: [require.resolve('@babel/preset-env')],
  })
})

test('has expected browserSync defaults', t => {
  t.deepEqual(bud.options.get('webpack.plugins.browsersync'), {
    host: 'localhost',
    online: false,
    open: false,
    port: 3000,
    proxy: 'localhost',
  })
})

test('has expected copy defaults', t => {
  t.deepEqual(bud.options.get('webpack.plugins.copy'), {
    patterns: [],
  })
})

test('has expected devServer defaults', t => {
  t.is(bud.options.get('webpack.devServer.headers'), undefined)
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

test('has expected optimization.splitChunks defaults', t => {
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks'), {
    cacheGroup: {
      vendor: {
        test: /node_modules/,
        name: 'vendor.js',
        chunks: 'all',
        priority: -20,
      },
    },
  })
})

test('has two postcss plugins by default', t => {
  t.true(bud.options.get('postcss.plugins').length == 2)
})

test('has expected splitting defaults', t => {
  t.deepEqual(bud.options.get('splitting'), {
    maxChunks: null,
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
