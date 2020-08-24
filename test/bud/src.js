const test = require('ava')
const {join} = require('path')
const {bud} = require('../../packages/bud')

const mockSrc = join(process.cwd(), 'src')

test('has expected default', t => {
  t.is(bud.paths.get('src'), process.cwd())
})

test('sets src path', t => {
  bud.srcPath('src')
  t.is(bud.paths.get('src'), mockSrc)
})

test('generates expected webpack output', t => {
  const config = bud.config.build()
  t.deepEqual(
    config.resolve.modules[0],
    mockSrc,
  )
})
