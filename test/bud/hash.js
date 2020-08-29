const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.features.get('hash'), false)
})

test('toggles feature', t => {
  bud.hash()
  t.is(bud.features.get('hash'), true)
  bud.hash(false)
  t.is(bud.features.get('hash'), false)
  bud.hash()
})

test('generates expected webpack.output.filename', t => {
  const config = bud.config(bud)
  t.deepEqual(
    config.output.filename,
    `${bud.options.get('filenameTemplate').hashed}.js`
  )
})
