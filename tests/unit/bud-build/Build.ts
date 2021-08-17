import {config, factory, Framework} from '@roots/bud'
import {Item, Loader, Rule} from '@roots/bud-build'

const items = [
  'css',
  'html',
  'style',
  'md',
  'minicss',
  'raw',
  'file',
  'asset',
  'resolve-url',
]

const rules = [
  'css',
  'js',
  'image',
  'font',
  'md',
  'svg',
  'html',
  'xml',
  'json5',
  'yml',
  'yaml',
  'toml',
]

describe('bud.build', function () {
  let bud: Framework
  let initialBuildConfig

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
    initialBuildConfig = {...bud.build.config}
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has rebuild method', () => {
    expect(bud.build.rebuild).toBeInstanceOf(Function)
  })

  it('has valid rules', () => {
    Object.entries(bud.build.rules).forEach(([name, rule]) => {
      rules.includes(name)
      expect(rule).toBeInstanceOf(Rule)
    })
  })

  it('has valid items', () => {
    Object.entries(bud.build.items).forEach(([name, item]) => {
      items.includes(name)
      expect(item).toBeInstanceOf(Item)
    })
  })

  it('has valid loaders', () => {
    Object.entries(bud.build.loaders).forEach(
      ([name, loader]) => {
        rules.includes(name)
        expect(loader).toBeInstanceOf(Loader)
      },
    )
  })

  it('bud.build.config has expected keys', () => {
    expect(Object.keys(bud.build.config)).toEqual([
      'bail',
      'cache',
      'context',
      'devtool',
      'entry',
      'experiments',
      'externals',
      'infrastructureLogging',
      'mode',
      'module',
      'name',
      'node',
      'output',
      'optimization',
      'parallelism',
      'performance',
      'plugins',
      'profile',
      'recordsPath',
      'resolve',
      'stats',
      'target',
      'watch',
      'watchOptions',
    ])
  })

  it('bud.build.rebuild modifies bud.build.config', () => {
    const entryValue = {
      app: {
        import: ['app.js'],
      },
    }

    bud.hooks.on('build/entry', () => entryValue)

    bud.build.rebuild()

    expect(initialBuildConfig).not.toEqual(bud.build.config)
    expect(bud.build.config.entry).toEqual(entryValue)
  })
})
