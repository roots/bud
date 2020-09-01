const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

bud.projectPath(resolve(__dirname, '../mock'))
bud.srcPath('public')
bud.distPath('dist')

const patterns = [
  {
    from: bud.src('images/baller.png'),
    to: bud.dist('baller.png'),
  },
  {
    from: bud.src('fonts/foo.ttf'),
    to: bud.dist('foo.png'),
  }
]

test('sets copy option', t => {
  bud.copy(patterns[0].from, patterns[0].to)

  t.deepEqual(bud.options.get('webpack.plugins.copy.patterns[0]'), patterns[0])
})

test('merges copy option', t => {
  bud.copy(patterns[1].from, patterns[1].to)

  t.deepEqual(bud.options.get('webpack.plugins.copy.patterns'), patterns)
})

test('generates expected webpack.plugins entry', t => {
  const config = bud.config(bud)
  t.deepEqual(config.plugins[1].patterns, patterns)
})
