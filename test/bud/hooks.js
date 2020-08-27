const test = require('ava')
const {bud} = require('@roots/bud')

test('can be set', t => {
  bud.hooks.on('test', value => 'pong')
})

test('can be called', t => {
  const value = 'ping'
  const filteredValue = bud.hooks.filter('test', value)

  t.is(filteredValue, 'pong')
})

test('can be set more than once', t => {
  bud.hooks.on('test2', value => 'pong')
  bud.hooks.on('test2', value => value + ' x2')
})

test('has expected value after multiple calls', t => {
  const value = 'ping'
  const filteredValue = bud.hooks.filter('test2', value)

  t.is(filteredValue, 'pong x2')
})

test('can filter webpack.devtool', t => {
  bud.hooks.on('webpack.devtool', devtool => 'ava')
  const output = bud.config(bud)

  t.is(output.devtool, 'ava')
})

test('can filter webpack.mode', t => {
  bud.hooks.on('webpack.mode', mode => mode.split('').shift())
  const output = bud.config(bud)

  t.is(output.mode, 'n')
})

test('can filter webpack.target', t => {
  bud.hooks.on('webpack.target', mode => mode.split('').reverse().shift())
  const output = bud.config(bud)

  t.is(output.target, 'b')
})
