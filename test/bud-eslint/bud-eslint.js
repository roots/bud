const ava = require('ava')
const {bud} = require('@roots/bud')
const {eslint} = require('@roots/bud-eslint')

bud.projectPath(process.cwd())

ava('extension includes bud object', t => {
  const extension = eslint(bud)
  t.is(extension.bud, bud)
})

ava('extension includes make function', t => {
  t.truthy(typeof eslint(bud).make === 'function')
})

bud.use([eslint])

ava('enables eslint feature', t => {
  t.true(
    bud.features.enabled('eslint')
  )
})
