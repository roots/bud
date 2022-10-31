import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {devtool} from './devtool.method.js'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

const callback = vi.fn() as any

describe(`bud.devtool`, function () {
  let method: devtool
  let bud

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
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
    await method()
    expect(bud.hooks.on).toHaveBeenCalledTimes(1)
  })

  it(`calls bud.hooks.on`, async () => {
    await method()
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.devtool`,
      `cheap-module-source-map`,
    )
  })

  it(`calls bud.hooks.on with expected arguments`, async () => {
    await method(callback)
    expect(bud.hooks.on).toHaveBeenCalledWith(`build.devtool`, callback)
  })
})
