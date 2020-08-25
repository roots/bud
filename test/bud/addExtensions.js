const test = require('ava')
const {bud} = require('@roots/bud')

test('adds extensions', t => {
  bud.addExtensions(['new'])

  t.true(
    bud.options.get('webpack.resolve.extensions').includes('.new')
  )
})

test('merges extensions', t => {
  bud.addExtensions(['gengar'])

  t.true(
    bud.options.get('webpack.resolve.extensions').includes('.new') &&
    bud.options.get('webpack.resolve.extensions').includes('.gengar')
  )
})

