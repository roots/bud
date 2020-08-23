const test = require('ava')
const {bud} = require('@roots/bud')

test('sanity check default extensions', t => {
  t.deepEqual(bud.options.get('webpack.resolve.extensions'), [
    '.css',
    '.js',
    '.json',
    '.svg',
  ])
})

test('parses basic extensions properly', t => {
  bud.util.usedExt([
    'foo.bar',
  ], bud)

  t.true(bud.options.get('webpack.resolve.extensions').includes('.bar'))
})

test('parses extensions with path in string properly', t => {
  bud.util.usedExt([
    'util/foo.bam',
  ], bud)

  t.true(bud.options.get('webpack.resolve.extensions').includes('.bam'))
})

test('does not duplicate extensions', t => {
  bud.util.usedExt([
    'util/foo.bam',
  ], bud)

  t.deepEqual(bud.options.get('webpack.resolve.extensions'), [
    '.css',
    '.js',
    '.json',
    '.svg',
    '.bar',
    '.bam',
  ])
})


