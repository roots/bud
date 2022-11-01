import {Bud, factory} from '@repo/test-kit/bud'
import Loader from '@roots/bud-build/loader'
import BudSass from '@roots/bud-sass'
import ResolveUrl from '@roots/bud-sass/resolve-url'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`@roots/bud-sass registration`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await new ResolveUrl(bud).register(bud)
    await new BudSass(bud).configAfter()
  })

  it(`adds scss extension`, () => {
    expect(
      Array.from(
        bud.hooks.filter(`build.resolve.extensions`) as Set<string>,
      ),
    ).toContain(`.scss`)
  })

  it(`adds sass extension`, () => {
    expect(
      Array.from(
        bud.hooks.filter(`build.resolve.extensions`) as Set<string>,
      ),
    ).toContain(`.sass`)
  })

  it(`adds sass loader`, () => {
    expect(bud.build.loaders[`sass-loader`]?.getSrc()).toEqual(
      expect.stringContaining(`sass-loader`),
    )
  })

  it(`adds sass ruleset item`, () => {
    expect(bud.build.items.sass?.getLoader()).toBeInstanceOf(Loader)
  })

  it(`adds sass rule`, () => {
    expect(bud.build.rules.sass?.getUse()).toContain(`sass`)
  })

  it(`sets sass test`, () => {
    expect(JSON.stringify(bud.build.rules.sass?.getTest())).toStrictEqual(
      JSON.stringify(bud.hooks.filter(`pattern.sass`)),
    )
  })

  it(`includes @src dir`, () => {
    expect(bud.build.rules.sass?.getInclude()?.pop()).toStrictEqual(
      bud.path(`@src`),
    )
  })

  it(`sets up rulesetuse items`, () => {
    expect(bud.build.rules.sass?.getUse()).toEqual([
      expect.stringContaining(`precss`),
      expect.stringContaining(`css`),
      expect.stringContaining(`postcss`),
      expect.stringContaining(`resolveUrl`),
      expect.stringContaining(`sass`),
    ])
  })
})
