const {bud} = require('@roots/bud')
const test = require('ava')

test('bud exists', t => {
  t.truthy(bud)
})

test('bud.auto', t => {
  t.truthy(bud.auto)
})

test('bud.auto riffs', t => {
  bud.auto({jquery: ['$', 'window.jQuery']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
  })
})

test('bud.auto slays', t => {
  bud.auto({frumpy: ['cat', 'stank']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
    cat: 'frumpy',
    stank: 'frumpy',
  })
})
