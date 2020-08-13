const test = require('ava')
const {bud} = require('@roots/bud')

test('has expected default', t => {
  t.is(bud.options.get('entry'), undefined)
})

test('sets option', t => {
  bud.bundle('entry', [bud.src('scripts/app.js')])

  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
  })
})

test('merges options', t => {
  bud.bundle('editor', [bud.src('scripts/editor.js')])

  t.deepEqual(bud.options.get('entry'), {
    entry: [bud.src('scripts/app.js')],
    editor: [bud.src('scripts/editor.js')],
  })
})

test('generates expected webpack.entry', t => {
  const config = bud.config()

  t.deepEqual(config.entry, {
    entry: [bud.src('scripts/app.js')],
    editor: [bud.src('scripts/editor.js')],
  })
})
