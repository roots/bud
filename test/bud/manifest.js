const test = require('ava')
const {bud} = require('@roots/bud')

test('test manifest default', t => {
  t.is(bud.features.enabled('manifest'), true)
})

test('can disable manifest', t => {
  bud.manifest({enabled: false})
  t.is(bud.features.enabled('manifest'), false)
})
