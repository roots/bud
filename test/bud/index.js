const {bud} = require('@roots/bud')
const test = require('ava')
const {join, resolve} = require('path')

const mockPath = resolve(__dirname, '../mock')

test('defaults: features', t => {
  t.deepEqual(bud.features.repository, {
    babel: false,
    browserSync: false,
    clean: true,
    css: true,
    cssModules: false,
    dashboard: true,
    debug: false,
    dependencyManifest: false,
    dump: false,
    font: true,
    hash: false,
    hot: false,
    image: true,
    inlineManifest: false,
    js: true,
    manifest: true,
    minify: true,
    optimize: true,
    overlay: false,
    postCss: false,
    purge: false,
    react: false,
    scss: false,
    scssModules: false,
    sourceMap: false,
    splitting: true,
    svg: true,
    terser: true,
    translate: false,
    uglify: false,
    vendor: true,
    watch: false,
  })
})

test('defaults: options', t => {
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
  t.deepEqual(bud.options.get('dependencyManifest'), {
    combineAssets: false,
    combinedOutputFile: null,
    injectPolyfill: false,
    outputFormat: 'json',
    useDefaults: true,
  })
  t.deepEqual(bud.options.get('dev'), {})
  t.deepEqual(bud.options.get('devtool'), 'source-map')
  t.deepEqual(bud.options.get('extensions'), ['.js', '.json'])
  t.deepEqual(bud.options.get('filenameTemplate'), {
    default: '[name]',
    hashed: '[name].[hash:8]',
  })
  t.deepEqual(bud.options.get('headers'), {
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Origin': '*',
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

test('bud.projectPath', t => {
  t.is(bud.paths.get('project'), process.cwd())
  bud.projectPath(mockPath)
  t.is(bud.paths.get('project'), mockPath)
})

test('bud.srcPath', t => {
  t.is(bud.paths.get('src'), process.cwd())
  bud.srcPath('src')
  t.is(bud.paths.get('src'), join(mockPath, 'src'))

  bud.distPath('dist')
  t.is(bud.paths.get('dist'), join(mockPath, 'dist'))
})

test('bud.auto', t => {
  bud.auto({jquery: ['$', 'window.jQuery']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
  })

  bud.auto({frumpy: ['cat', 'stank']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
    cat: 'frumpy',
    stank: 'frumpy',
  })
})

test('bud.alias', t => {
  bud.alias({'@scripts': bud.src('scripts')})
  t.deepEqual(bud.options.get('alias'), {
    '@scripts': bud.src('scripts'),
  })

  bud.alias({'@styles': bud.src('styles')})
  t.deepEqual(bud.options.get('alias'), {
    '@styles': bud.src('styles'),
  })
})

test('bud.bundle', t => {
  t.is(bud.options.get('entry'), undefined)
  bud.bundle('entry', [bud.src('scripts/app.js')])
  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
  })

  bud.bundle('editor', [bud.src('scripts/editor.js')])
  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
    editor: [bud.src('scripts/editor.js')],
  })
})

test('bud.hash', t => {
  t.is(bud.features.get('hash'), false)
  bud.hash()
  t.is(bud.features.get('hash'), true)
})

test('bud.mini', t => {
  t.is(bud.features.get('minify'), true)
  bud.mini(false)
  t.is(bud.features.get('minify'), false)
  bud.mini()
  t.is(bud.features.get('minify'), true)
})
