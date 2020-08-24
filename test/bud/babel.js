const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected defaults', t => {
  t.deepEqual(bud.options.get('babel'), {
    plugins: [],
    presets: [require.resolve('@babel/preset-env')],
  })
})

test('sets option', t => {
  bud.babel({plugins: ['plugin']})

  t.deepEqual(bud.options.get('babel'), {
    plugins: ['plugin'],
    presets: [require.resolve('@babel/preset-env')],
  })
})

test('merges option', t => {
  bud.babel({
    presets: [
      '💯'
    ],
  })

  t.deepEqual(bud.options.get('babel'), {
    plugins: ['plugin'],
    presets: [require.resolve('@babel/preset-env'),
      '💯',
    ],
  })
})

test('generates expected webpack.module.rules[] use entry', t => {
  bud.options.set('babel.plugins', [])
  bud.options.set('babel.presets', [])
  bud.options.set('babel.presets', [require.resolve('@babel/preset-env')])

  const config = bud.config.build()

  t.deepEqual(config.module.rules[0].use[0].options, {
    cacheCompression: true,
    cacheDirectory: true,
    plugins: [],
    presets: [require.resolve('@babel/preset-env')],
  })
})
