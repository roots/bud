import {Framework, setupBud, teardownBud} from '../util'
import {Loader, Item, Rule} from '@roots/bud-build'

export const loaders = [
  'css',
  'html',
  'md',
  'style',
  'minicss',
  'file',
  'url',
  'resolve-url',
]

export const items = [
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

export const rules = [
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
]

describe('bud.build', function () {
  let bud: Framework

  beforeAll(done => {
    bud = setupBud()
    done()
  })

  afterAll(done => {
    bud = teardownBud(bud)
    done()
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
