const test = require('ava')
const features = require('../fixtures/features')
const {bud} = require('@roots/bud')

test('bud.inlineManifest', t => {
  t.is(bud.features.get('inlineManifest'), false)
  bud.inlineManifest()
  t.is(bud.features.get('inlineManifest'), true)

  bud.inlineManifest({enabled: false})
  t.is(bud.features.get('inlineManifest'), false)

  bud.inlineManifest({name: 'inline'})
  t.is(bud.features.get('inlineManifest'), true)
  t.deepEqual(bud.options.get('inlineManifest'), {name: 'inline'})

  bud.inlineManifest()
})
