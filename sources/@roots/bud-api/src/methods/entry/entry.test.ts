import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {entry, method} from './entry.method.js'

describe(`bud.entry`, function () {
  let bud
  let method: method

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    method = entry.bind(bud)
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const ret = await method(`foo`)
    expect(ret).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(`foo`)
    expect(onSpy).toHaveBeenCalledTimes(1)
  })

  it(`should throw when a string is passed as arg0 and a non-array/string as arg1`, async () => {
    try {
      expect(
        // @ts-ignore
        await method([`foo`], {bar: `bar`}),
      ).toThrow()
    } catch (e) {}
  })

  it(`should throw when passed no args`, async () => {
    try {
      // @ts-ignore
      await method()
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it(`should call bud.hooks.on with expected arguments`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(`foo`)
    expect(onSpy).toHaveBeenCalledWith(`build.entry`, expect.any(Function))
  })

  it(`should accept a string`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await method(`foo`)

    expect(onSpy).toHaveBeenCalledWith(`build.entry`, expect.any(Function))
  })

  it(`should accept an array`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await method([`foo`])

    expect(onSpy).toHaveBeenCalledWith(`build.entry`, expect.any(Function))
  })

  it(`should accept an object`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await method({
      foo: `foo`,
    })

    expect(onSpy).toHaveBeenCalledWith(`build.entry`, expect.any(Function))
  })
})
