import {Item, Loader, Rule} from '@roots/bud-build'

import {Framework, setupBud, teardownBud} from '../../util'

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

  beforeAll(() => {
    bud = setupBud()
  })

  afterAll(() => {
    bud = teardownBud(bud)
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
})
