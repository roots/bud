const test = require('ava')
const features = require('../fixtures/features')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.features.get('inlineManifest'), false)
})

test('sets feature', t => {
  bud.inlineManifest()
  t.is(bud.features.get('inlineManifest'), true)
})

test('enabled parameter sets feature', t => {
  bud.inlineManifest({enabled: false})
  t.is(bud.features.get('inlineManifest'), false)
})

test('name parameter sets option', t => {
  bud.inlineManifest({name: 'inline'})
  t.deepEqual(bud.options.get('inlineManifest'), {name: 'inline'})
})

test('name parameter implicitly sets feature', t => {
  bud.features.set('inlineManifest', false)

  bud.inlineManifest({name: 'inline'})
  t.deepEqual(bud.options.get('inlineManifest'), {name: 'inline'})
  t.is(bud.features.get('inlineManifest'), true)
})
