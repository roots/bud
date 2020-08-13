const test = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')

test('bud.auto', t => {
  bud.auto({jquery: ['$', 'window.jQuery']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
  })

  bud.auto({frumpy: ['cat', 'stank']})
  t.deepEqual(bud.options.get('auto'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
    cat: 'frumpy',
    stank: 'frumpy',
  })
})
