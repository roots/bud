const test = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')

test('sets option', t => {
  bud.alias({'@scripts': bud.src('scripts')})
  t.deepEqual(bud.options.get('webpack.resolve.alias'), {
    '@scripts': bud.src('scripts'),
  })
})

test('merges options', t => {
  bud.alias({'@styles': bud.src('styles')})
  t.deepEqual(bud.options.get('webpack.resolve.alias'), {
    '@scripts': bud.src('scripts'),
    '@styles': bud.src('styles'),
  })
})

test('generates expected webpack.resolve', t => {
  const config = bud.config(bud)
  t.deepEqual(config.resolve, {
    alias: {
      '@scripts': bud.src('scripts'),
      '@styles': bud.src('styles'),
    },
    extensions: ['.css', '.js', '.json', '.svg'],
    modules: [
      bud.src(),
      bud.project('node_modules'),
      join(bud.paths.get('framework'), 'node_modules'),
    ],
  })
})
