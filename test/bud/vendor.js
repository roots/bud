const test = require('ava')
const {bud} = require('@roots/bud')

test('is disabled by default', t => {
  t.is(bud.features.get('vendor'), false)
})

test('feature enabled when called', t => {
  bud.vendor()
  t.is(bud.features.get('vendor'), true)
})

test('has expected default options', t => {
  t.deepEqual(bud.options.get('optimization.splitChunks.cacheGroup.vendor'), {
    test: /node_modules/,
    name: 'vendor.js',
    chunks: 'all',
    priority: -20,
  })
})

test('test option can be reassigned', t => {
  bud.vendor({test: /dank/})
  t.deepEqual(bud.options.get('optimization.splitChunks.cacheGroup.vendor'), {
    test: /dank/,
    name: 'vendor.js',
    chunks: 'all',
    priority: -20,
  })
})

test('name option can be reassigned', t => {
  bud.vendor({name: 'whois.plagueis'})
  t.deepEqual(bud.options.get('optimization.splitChunks.cacheGroup.vendor'), {
    test: /dank/,
    name: 'whois.plagueis',
    chunks: 'all',
    priority: -20,
  })
})

test('chunks option can be reassigned', t => {
  bud.vendor({chunks: 'chonks'})
  t.deepEqual(bud.options.get('optimization.splitChunks.cacheGroup.vendor'), {
    test: /dank/,
    name: 'whois.plagueis',
    chunks: 'chonks',
    priority: -20,
  })
})

test('priority option can be reassigned', t => {
  bud.vendor({priority: 9001})
  t.deepEqual(bud.options.get('optimization.splitChunks.cacheGroup.vendor'), {
    test: /dank/,
    name: 'whois.plagueis',
    chunks: 'chonks',
    priority: 9001,
  })
})
