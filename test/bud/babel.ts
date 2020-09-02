const test = require('ava')
const bud = require('@roots/bud')
const {join} = require('path')

const base = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        forceAllTransforms: true,
      },
    ],
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    [
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
  ],
}

test('has expected defaults', t => {
  t.deepEqual(bud.options.get('babel'), base)
})

test('sets option', t => {
  bud.babel({ plugins: ['plugin'] })

  t.deepEqual(bud.options.get('babel'), {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          forceAllTransforms: true,
        },
      ],
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false,
        },
      ],
      'plugin',
    ],
  })
})

test('merges option', t => {
  bud.babel({
    presets: [
      '💯'
    ],
  })

  t.deepEqual(bud.options.get('babel'), {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: false,
          forceAllTransforms: true,
        },
      ],
      '💯',
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        require.resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false,
        },
      ],
      'plugin',
    ],
  })
})

test('generates expected webpack.module.rules[] use entry', t => {
  bud.options.set('babel.plugins', [])
  bud.options.set('babel.presets', [])
  bud.options.set('babel.presets', [require.resolve('@babel/preset-env')])

  const config = bud.config(bud)

  t.deepEqual(config.module.rules[0].use[0].options, {
    cacheCompression: true,
    cacheDirectory: true,
    plugins: [],
    presets: [require.resolve('@babel/preset-env')],
  })
})
