const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')
const {react} = require('@roots/bud-react')

test('has expected defaults', t => {
  bud.use([react])

  t.true(bud.options.get('webpack.resolve.extensions').includes('.jsx'))
})
