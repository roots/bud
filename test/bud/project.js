const test = require('ava')
const {join} = require('path')

const {bud} = require('@roots/bud')

const mockPath = join(process.cwd(), 'project')

test('has expected default', t => {
  t.is(bud.paths.get('project'), process.cwd())
})

test('sets project path', t => {
  bud.projectPath(mockPath)
  t.is(bud.paths.get('project'), mockPath)
})

test('generates expected webpack output', t => {
  const config = bud.config(bud)
  t.deepEqual(
    config.context,
    mockPath,
  )
})
