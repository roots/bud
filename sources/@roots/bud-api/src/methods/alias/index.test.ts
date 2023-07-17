import {path} from '@repo/constants'
import {type Bud, factory} from '@repo/test-kit'
import {alias as aliasFn} from '@roots/bud-api/methods/alias'
import {beforeAll, describe, expect, it} from 'vitest'

describe(`bud.alias`, () => {
  let bud: Bud
  let alias: typeof aliasFn

  beforeAll(async () => {
    bud = await factory()
    alias = aliasFn.bind(bud)
  })

  it(`should be operating in an expected env`, async () => {
    expect(bud.path(`@src`)).toBe(path(`tests`, `util`, `project`, `src`))
  })

  it(`should be a function`, () => {
    expect(alias).toBeInstanceOf(Function)
  })

  it(`should set an alias from an object`, async () => {
    const returned = alias({'@foo': bud.path(`@src`, `foo`)})
    expect(
      await returned.hooks.filterAsync(`build.resolve.alias`),
    ).toEqual(
      expect.objectContaining({
        '@foo': bud.path(`@src`, `foo`),
      }),
    )
  })

  it(`should set async hook from signifier value pair`, async () => {
    const returned = alias(`test`, `test`)
    expect(
      await returned.hooks.filterAsync(`build.resolve.alias`),
    ).toEqual(
      expect.objectContaining({
        test: `test`,
      }),
    )
  })
})
