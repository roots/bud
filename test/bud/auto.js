const test = require('ava')
const {bud} = require('@roots/bud')

test('sets option', t => {
  bud.auto({jquery: ['$', 'window.jQuery']})

  t.deepEqual(bud.options.get('webpack.externals'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
  })
})

test('merges options', t => {
  bud.auto({frumpy: ['cat', 'stank']})

  t.deepEqual(bud.options.get('webpack.externals'), {
    $: 'jquery',
    'window.jQuery': 'jquery',
    cat: 'frumpy',
    stank: 'frumpy',
  })
})
