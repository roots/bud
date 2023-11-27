import {Bud, factory} from '@repo/test-kit'
import {devtool} from '@roots/bud-api/methods/devtool'
import {beforeEach, describe, expect, it, vi} from 'vitest'

const callback = vi.fn() as any

describe(`bud.devtool`, function () {
  let method: devtool
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    bud.hooks.on = callback
    method = devtool.bind(bud)
    vi.clearAllMocks()
  })

  it(`should be a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const value = await method()
    expect(value).toBe(bud)
  })

  it(`should call bud.hooks.on`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method()
    expect(onSpy).toHaveBeenCalledTimes(1)
  })


  it (`should set source-map in production`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method()
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, `source-map`)
  })

  it(`should set eval in development`, async () => {
    bud = await factory({mode: `development`})
    bud.hooks.on = callback
    method = devtool.bind(bud)

    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method()
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, `eval`)
  })

  it (`should accept a string value`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(`cheap-module-source-map`)
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, `cheap-module-source-map`)
  })

  it(`should accept a callback function`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(callback)
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, callback)
  })

  it (`should accept false`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(false)
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, false)
  })

})
