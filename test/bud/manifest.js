const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.features.enabled('manifest'), true)
})
