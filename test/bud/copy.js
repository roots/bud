const test = require('ava')
const {join} = require('path')
const {bud} = require('@roots/bud')

const patterns = [
  {
    from: bud.src('images/test.png'),
    to: bud.dist('images/test.png'),
  },
  {
    from: bud.src('fonts/test.ttf'),
    to: bud.dist('fonts/test.ttf'),
  }
]

test('sets copy option', t => {
  bud.copy(patterns[0].from, patterns[0].to)

  t.deepEqual(bud.options.get('copy'), {
    patterns: [
      patterns[0]
    ],
  })
})

test('merges copy option', t => {
  bud.copy(patterns[1].from, patterns[1].to)

  t.deepEqual(bud.options.get('copy'), {
    patterns,
  })
})

test('generates expected webpack.plugins entry', t => {
  const config = bud.config()

  t.deepEqual(config.plugins[1].patterns, patterns)
})
