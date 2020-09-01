const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

test('has expected default', t => {
  t.is(bud.features.get('minify'), false)
})

test('toggles feature', t => {
  bud.mini()
  t.is(bud.features.get('minify'), true)
})
