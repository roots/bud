const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

test('is disabled by default', t => {
  t.is(bud.features.get('splitChunks'), false)
})

test('feature enabled when called', t => {
  bud.vendor()
  t.is(bud.features.get('splitChunks'), true)
})

test('has expected default options', t => {
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.test'), /[\\/]node_modules[\\/]/)
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.chunks'), 'all')
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.automaticNamePrefix'), 'vendor')
})

test('test option can be reassigned', t => {
  bud.vendor({test: /dank/})
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.test'), /dank/)
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.chunks'), 'all')
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.automaticNamePrefix'), 'vendor')
})

test('chunks option can be reassigned', t => {
  bud.vendor({chunks: 'chonks'})
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.test'), /dank/)
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.chunks'), 'chonks')
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.automaticNamePrefix'), 'vendor')
})

test('priority option can be reassigned', t => {
  bud.vendor({priority: 9001})
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.test'), /dank/)
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.chunks'), 'chonks')
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.automaticNamePrefix'), 'vendor')
  t.deepEqual(bud.options.get('webpack.optimization.splitChunks.cacheGroups.vendor.priority'), 9001)
})
