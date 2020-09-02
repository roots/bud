const test = require('ava')
const bud = require('@roots/bud')
const {join, resolve} = require('path')

test('projectPath has expected default', t => {
  t.is(bud.paths.get('project'), process.cwd())
})

test('srcPath has expected default', t => {
  t.is(bud.paths.get('src'), join(process.cwd(), 'src'))
})

test('distPath has expected default', t => {
  t.is(bud.paths.get('dist'), join(process.cwd(), 'dist'))
})

