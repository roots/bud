const test = require('ava')
const {bud} = require('@roots/bud')

const features = {
  babel: true,
  clean: true,
  hash: false,
  hot: false,
  manifest: true,
  minify: false,
  overlay: false,
  postcss: true,
  runtimeChunk: false,
  sourceMap: false,
  splitChunks: false,
  watch: false,
}

test('has expected defaults', t => {
  const {bud} = require('@roots/bud')
  t.deepEqual(bud.features.repository, features)
})
