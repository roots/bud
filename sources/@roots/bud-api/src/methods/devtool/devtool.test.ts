import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {devtool} from './index.js'

const callback = vi.fn() as any

describe(`bud.devtool`, function () {
  let method: devtool
  let bud

  beforeEach(async () => {
    bud = await factory()
    bud.hooks.on = callback
    method = devtool.bind(bud)
    vi.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`returns bud`, async () => {
    const ret = await method()
    expect(ret).toBe(bud)
  })

  it(`calls bud.hooks.on`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method()
    expect(onSpy).toHaveBeenCalledTimes(1)
  })

  it(`calls bud.hooks.on`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method()
    expect(onSpy).toHaveBeenCalledWith(
      `build.devtool`,
      `cheap-module-source-map`,
    )
  })

  it(`calls bud.hooks.on with expected arguments`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await method(callback)
    expect(onSpy).toHaveBeenCalledWith(`build.devtool`, callback)
  })
})
