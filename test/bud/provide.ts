const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

test('sets option', t => {
  bud.provide({jquery: ['$', 'window.jQuery']})

  t.deepEqual(bud.options.get('webpack.plugins.provide'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
  })
})

test('merges options', t => {
  bud.provide({frumpy: ['cat', 'stank']})

  t.deepEqual(bud.options.get('webpack.plugins.provide'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
    cat: 'frumpy',
    stank: 'frumpy',
  })
})
