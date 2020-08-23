const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.features.get('runtimeChunk'), false)
})

test('sets feature', t => {
  bud.runtimeManifest()
  t.is(bud.features.get('runtimeChunk'), true)
})

test('enabled parameter sets feature', t => {
  bud.runtimeManifest({enabled: false})
  t.is(bud.features.get('runtimeChunk'), false)
})

test('name parameter sets option', t => {
  bud.runtimeManifest({name: 'inline'})
  t.deepEqual(bud.options.get('webpack.optimization.runtimeChunk.name'), 'inline')
})

test('name parameter implicitly sets feature', t => {
  bud.features.set('runtimeManifest', false)

  bud.runtimeManifest({name: 'inline'})
  t.deepEqual(bud.options.get('webpack.optimization.runtimeChunk.name'), 'inline')
  t.is(bud.features.get('runtimeChunk'), true)
})
