const test = require('ava')
const features = require('../fixtures/features')
const {bud} = require('@roots/bud')

test('has expected defaults', t => {
  const {bud} = require('@roots/bud')
  t.deepEqual(bud.features.repository, features)
})
