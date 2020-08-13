const test = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.options.get('devtool'), 'source-map')
})

test('sets option', t => {
  bud.devtool('fictional-devtool')
  t.is(bud.options.get('devtool'), 'fictional-devtool')
  bud.devtool('source-map')
  t.is(bud.options.get('devtool'), 'source-map')
})

test('generates expected webpack.devtool', t => {
  const config = bud.config()
  t.deepEqual(
    config.devtool,
    'source-map',
  )
})
