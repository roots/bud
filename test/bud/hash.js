const test = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')

test('bud.hash', t => {
  t.is(bud.features.get('hash'), false)
  bud.hash()
  t.is(bud.features.get('hash'), true)
})

test('bud.config output', t => {
  const config = bud.config()
  t.deepEqual(config.output, {
    filename: `${bud.options.get('filenameTemplate').hashed}.js`,
    path: bud.dist(),
    publicPath: '/',
  })
})
