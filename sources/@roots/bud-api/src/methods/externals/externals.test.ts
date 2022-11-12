import {beforeEach, describe, expect, it, vi} from 'vitest'

import {externals as subject} from './externals.method.js'
import {factory} from '@repo/test-kit/bud'

describe(`bud.entry`, function () {
  let externals: subject
  let bud

  beforeEach(async () => {
    bud = await factory()
    externals = subject.bind(bud)
    vi.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(externals).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const returnedVaulue = externals({foo: [`bar`]})
    expect(returnedVaulue).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    bud.hooks.on(`build.externals`, undefined)
    const onSpy = vi.spyOn(bud.hooks, `on`)
    externals({foo: [`bar`]})
    expect(onSpy).toHaveBeenCalledTimes(1)
  })

  it(`should modify build.config.externals using an obj`, async () => {
    bud.hooks.on(`build.externals`, undefined)
    const onSpy = vi.spyOn(bud.hooks, `on`)

    externals({react: `window.React`})
    expect(onSpy).toHaveBeenCalledWith(`build.externals`, {
      react: `window.React`,
    })
  })

  it(`should modify build.config.externals using a callback`, async () => {
    bud.hooks.on(`build.externals`, undefined)
    const onSpy = vi.spyOn(bud.hooks, `on`)

    externals({react: `window.React`})
    externals(externals => ({...externals, foo: ['bar']}))
    expect(onSpy).toHaveBeenLastCalledWith(`build.externals`, {
      react: `window.React`,
      foo: ['bar'],
    })
  })
})
