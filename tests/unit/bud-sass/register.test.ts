import {Bud, factory} from '@repo/test-kit/bud'
import {Loader} from '@roots/bud-build'
import * as BudSass from '@roots/bud-sass/src/index'

describe('@roots/bud-sass registration', () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await BudSass.register(bud, bud.extensions.logger)
  })

  it('adds scss extension', () => {
    expect(
      Array.from(bud.hooks.filter('build.resolve.extensions')),
    ).toContain('.scss')
  })

  it('adds sass extension', () => {
    expect(
      Array.from(bud.hooks.filter('build.resolve.extensions')),
    ).toContain('.sass')
  })

  it('adds sass loader', () => {
    expect(bud.build.loaders.sass.getSrc()).toEqual(
      expect.stringContaining('sass-loader'),
    )
  })

  it('adds sass ruleset item', () => {
    expect(bud.build.items.sass.getLoader()).toBeInstanceOf(Loader)
  })

  it('adds sass rule', () => {
    expect(bud.build.rules.sass.getUse()).toContain('sass')
  })

  it('sets sass test', () => {
    expect(bud.build.rules.sass.getTest()).toBe(
      bud.store.get('patterns.sass'),
    )
  })

  it('includes @src dir', () => {
    expect(bud.build.rules.sass.getInclude()).toStrictEqual([
      bud.path('@src'),
    ])
  })

  it('sets up rulesetuse items', () => {
    expect(bud.build.rules.sass.getUse()).toEqual([
      expect.stringContaining(`precss`),
      expect.stringContaining(`css`),
      expect.stringContaining(`postcss`),
      expect.stringContaining(`resolveUrl`),
      expect.stringContaining(`sass`),
    ])
  })
})
