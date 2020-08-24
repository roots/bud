const test = require('ava')
const {bud} = require('@roots/bud')
const {join, resolve} = require('path')

const mockPath = resolve(__dirname, '../mock')

test('bud.projectPath', t => {
  t.is(bud.paths.get('project'), process.cwd())
  bud.projectPath(mockPath)
  t.is(bud.paths.get('project'), mockPath)
})

test('bud.srcPath', t => {
  t.is(bud.paths.get('src'), process.cwd())
  bud.srcPath('src')
  t.is(bud.paths.get('src'), join(mockPath, 'src'))
})

test('sets path', t => {
  t.is(bud.paths.get('dist'), process.cwd())
  bud.distPath('dist')
  t.is(bud.paths.get('dist'), join(mockPath, 'dist'))
})

test('generates expected webpack.output.path', t => {
  const config = bud.config.build()
  t.deepEqual(
    config.output.path,
    bud.dist(),
  )
})
