const test = require('ava')
const {bud} = require('../../packages/bud')
const {react} = require('@roots/bud-react')

test('has expected defaults', t => {
  bud.use([react])
  t.true(bud.options.get('resolve.extensions').includes('.jsx'))
})
