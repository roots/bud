const ava = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

ava('has expected default', t => {
  t.is(bud.features.get('runtimeChunk'), false)
})

ava('name parameter sets option', t => {
  bud.runtimeManifest({name: 'inline'})
  t.deepEqual(
    bud.options.get('webpack.optimization.runtimeChunk.name'),
    'inline',
  )
})

ava('name parameter implicitly sets feature', t => {
  bud.features.set('runtimeManifest', false)

  bud.runtimeManifest({name: 'inline'})
  t.deepEqual(
    bud.options.get('webpack.optimization.runtimeChunk.name'),
    'inline',
  )
  t.is(bud.features.get('runtimeChunk'), true)
})

ava('sets feature', t => {
  bud.runtimeManifest()
  t.is(bud.features.get('runtimeChunk'), true)
})
