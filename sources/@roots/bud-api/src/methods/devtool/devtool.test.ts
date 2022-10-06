import {describe, expect, it, jest} from '@jest/globals'

import {devtool} from './devtool.method.js'

const callback = jest.fn() as any
const bud = {
  hooks: {
    on: jest.fn(),
  },
} as any

describe(`bud.devtool`, function () {
  let method: devtool

  beforeEach(async () => {
    method = devtool.bind(bud)
    jest.clearAllMocks()
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
