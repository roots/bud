const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected defaults', t => {
  t.deepEqual(bud.options.get('babel'), {
    plugins: [],
    presets: [],
  })
  t.deepEqual(bud.options.get('browserSync'), {
    host: 'localhost',
    online: false,
    open: false,
    port: 3000,
    proxy: 'localhost',
  })
  t.deepEqual(bud.options.get('copy'), {
    patterns: [],
  })
  t.deepEqual(bud.options.get('dev.headers'), {
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Origin': '*',
  })
  t.deepEqual(bud.options.get('devtool'), 'source-map')
  t.deepEqual(bud.options.get('resolve'), {
    alias: false,
    extensions: ['.css', '.js', '.json', '.svg'],
  })
  t.deepEqual(bud.options.get('filenameTemplate'), {
    default: '[name]',
    hashed: '[name].[hash:8]',
  })
  t.deepEqual(bud.options.get('inlineManifest'), {
    name: 'runtime',
  })
  t.deepEqual(bud.options.get('postCss'), {
    plugins: [],
  })
  t.deepEqual(bud.options.get('splitting'), {
    maxChunks: null,
  })
  t.deepEqual(bud.options.get('target'), 'web')
  t.deepEqual(bud.options.get('terser'), {
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
  t.deepEqual(bud.options.get('uglify').cache, true)
  t.truthy(bud.options.get('uglify').chunkFilter)
  t.deepEqual(bud.options.get('uglify').extractComments, false)
  t.deepEqual(bud.options.get('uglify').parallel, true)
  t.deepEqual(bud.options.get('uglify').uglifyOptions, {
    output: {
      beautify: false,
    },
    compress: false,
    mangle: {
      toplevel: true,
    },
  })
  t.deepEqual(bud.options.get('vendor'), {
    name: 'vendor',
  })
})

test('sets value', t => {
  bud.options.set('foo', 'bar')
  t.deepEqual(bud.options.get('foo'), 'bar')
})
