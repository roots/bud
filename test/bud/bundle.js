const test = require('ava')
const {bud} = require('@roots/bud')

test('default is undefined', t => {
  t.is(bud.options.get('entry'), undefined)
})

test('adds entrypoint to options', t => {
  bud.bundle('entry', [bud.src('scripts/app.js')])

  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
  })
})

test('adds second entrypoint to options', t => {
  bud.bundle('editor', [bud.src('scripts/editor.js')])

  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
    editor: [bud.src('scripts/editor.js')],
  })
})

test('generates expected config', t => {
  const config = bud.config()

  t.deepEqual(config.entry, {
    entry: [bud.src('scripts/app.js')],
    editor: [bud.src('scripts/editor.js')],
  })
})
