const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

test('has expected default', t => {
  t.is(bud.features.enabled('manifest'), true)
})
