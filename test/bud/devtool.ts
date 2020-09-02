const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

test('has expected default', t => {
  t.is(bud.options.get('webpack.devtool'), 'source-map')
})

test('sets option', t => {
  bud.devtool('fictional-devtool')
  t.is(bud.options.get('webpack.devtool'), 'fictional-devtool')
  bud.devtool('source-map')
  t.is(bud.options.get('webpack.devtool'), 'source-map')
})

test('generates expected webpack.devtool', t => {
  const config = bud.config(bud)
  t.deepEqual(
    config.devtool,
    'source-map',
  )
})
