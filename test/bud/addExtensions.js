const test = require('ava')
const {bud} = require('@roots/bud')

test('adds extensions specified with without leading dot', t => {
  bud.addExtensions(['.new'])

  t.true(
    bud.options.get('webpack.resolve.extensions').includes('.new')
  )
})

test('adds extensions specified with leading dot', t => {
  bud.addExtensions(['.boo'])

  t.true(
    bud.options.get('webpack.resolve.extensions').includes('.boo')
  )
})

test('merges extensions', t => {
  bud.addExtensions(['gengar'])

  t.true(bud.options.get('webpack.resolve.extensions').includes('.new'))
  t.true(bud.options.get('webpack.resolve.extensions').includes('.gengar'))
  t.true(bud.options.get('webpack.resolve.extensions').includes('.boo'))
  t.true(bud.options.get('webpack.resolve.extensions').includes('.css'))
})

