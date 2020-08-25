const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.features.get('sourceMap'), false)
})

test('toggles feature', t => {
  bud.map()
  t.is(bud.features.get('sourceMap'), true)
  bud.map(false)
  t.is(bud.features.get('sourceMap'), false)
  bud.map()
})
