const test = require('ava')
const {join} = require('path')
const {bud} = require('../../packages/bud')

const mockSrc = join(process.cwd(), 'src')
const changedSrc = join(process.cwd(), 'newSrc')

test('has expected default', t => {
  t.is(bud.paths.get('src'), mockSrc)
})

test('sets src path', t => {
  bud.srcPath('newSrc')
  t.is(bud.paths.get('src'), changedSrc)
})

test('generates expected webpack output', t => {
  const config = bud.config(bud)
  t.deepEqual(
    config.resolve.modules[0],
    changedSrc,
  )
})
