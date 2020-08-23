const test = require('ava')
const {emptyDir} = require('fs-extra')
const {join, resolve} = require('path')

const {bud} = require('@roots/bud')

const mockDir = resolve(process.cwd(), 'test/mock')
const imagesDir = resolve(mockDir, 'public/images')
const fontsDir = resolve(mockDir, 'public/fonts')

bud.projectPath(mockDir)
bud.distPath('dist')

bud.project()

const patterns = [
  {
    from: bud.project('public/images/*'),
    to: bud.dist(),
  },
  {
    from: bud.project('public/fonts/*'),
    to: bud.dist(),
  }
]

const expectations = [
  {
    context: join(imagesDir, '*'),
    from: '**/*',
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
    to: bud.dist(),
  },
  {
    context: join(fontsDir, '*'),
    from: '**/*',
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
    to: bud.dist(),
  },
]

test('sets copyAll option', t => {
  bud.copyAll(patterns[0].from, patterns[0].to)

  t.deepEqual(bud.options.get('webpack.plugins.copy.patterns[0]'), expectations[0])
})

test('merges copyAll option', t => {
  bud.copyAll(patterns[1].from, patterns[1].to)

  t.deepEqual(bud.options.get('webpack.plugins.copy.patterns'), expectations)
})

test('generates expected webpack.plugins entry', t => {
  const config = bud.config()

  t.deepEqual(config.plugins[1].patterns, expectations)

  t.teardown(async () => {
    await emptyDir(bud.dist())
  })
})
