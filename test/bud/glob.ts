const test = require('ava')
const {resolve} = require('path')
const bud = require('@roots/bud')

const mockDir = resolve(process.cwd(), 'test/mock')
bud.projectPath(mockDir)
bud.srcPath('src')
bud.distPath('dist')

const pattern = '**/*.js'
const expectation = {
  'app/': ['scripts/app.js', 'scripts/editor.js'],
}

test('sets glob option', t => {
  bud.glob('app', pattern)

  t.deepEqual(bud.options.get('webpack.entry'), expectation)
})

test('generates expected webpack.entry', t => {
  const config = bud.config(bud)
  t.deepEqual(config.entry, expectation)
})
