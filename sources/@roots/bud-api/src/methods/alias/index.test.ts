import {beforeEach, describe, expect, it} from '@jest/globals'
import {factory, repoPath} from '@repo/test-kit/bud'

import {alias} from './index.js'

describe(`bud.alias`, () => {
  let bud
  let instance: typeof alias

  beforeEach(async () => {
    bud = await factory()
    instance = alias.bind(bud)
  })

  it(`should be operating in an expected env`, async () => {
    expect(bud.path(`@src`)).toBe(
      repoPath(`tests`, `util`, `project`, `src`),
    )

    const value = await bud.hooks.filterAsync(`build.resolve.alias`)
    expect(value).toEqual({
      '@src': repoPath(`tests`, `util`, `project`, `src`),
      '@dist': repoPath(`tests`, `util`, `project`, `dist`),
    })
  })

  it(`should be a function`, () => {
    expect(bud.alias).toBeInstanceOf(Function)
  })

  it(`should set an alias from an object`, async () => {
    await instance({'@foo': bud.path(`@src`, `foo`)})

    const value = await bud.hooks.filterAsync(`build.resolve.alias`)

    expect(value).toEqual({
      '@dist': bud.path(`@dist`),
      '@src': bud.path(`@src`),
      '@foo': bud.path(`@src`, `foo`),
    })
  })

  it(`should set an alias from two string parameters`, async () => {
    await instance(`@foo`, bud.path(`@src/foo`))

    const alias = await bud.hooks.filterAsync(`build.resolve.alias`)

    expect(alias).toEqual({
      '@dist': bud.path(`@dist`),
      '@src': bud.path(`@src`),
      '@foo': bud.path(`@src/foo`),
    })
  })
})
