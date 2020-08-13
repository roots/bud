const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected defaults', t => {
  t.deepEqual(bud.options.get('babel'), {plugins: [], presets: []})
})

test('sets option', t => {
  bud.babel({plugins: [require('babel-plugin-macros')]})
  t.deepEqual(bud.options.get('babel'), {
    plugins: [require('babel-plugin-macros')],
    presets: [],
  })
})

test('merges option', t => {
  bud.babel({
    presets: [
      require('@babel/preset-env', {
        modules: false,
        forceAllTransforms: true,
      }),
    ],
  })

  t.deepEqual(bud.options.get('babel'), {
    plugins: [require('babel-plugin-macros')],
    presets: [
      require('@babel/preset-env', {
        modules: false,
        forceAllTransforms: true,
      }),
    ],
  })
})

test('generates expected webpack.module.rules[] use entry', t => {
  const config = bud.config()
  t.deepEqual(config.module.rules[0].use[0].options, {
    cacheCompression: false,
    cacheDirectory: true,
    plugins: [require('babel-plugin-macros')],
    presets: [
      require('@babel/preset-env', {
        modules: false,
        forceAllTransforms: true,
      }),
    ],
  })
})
