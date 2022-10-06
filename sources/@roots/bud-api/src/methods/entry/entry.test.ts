import {describe, expect, it, jest} from '@jest/globals'

import {entry, method} from './entry.method.js'

const callback = jest.fn() as any
const bud = {
  label: `bud`,
  hooks: {
    on: jest.fn((_label: string, value: any) => {
      return callback(value())
    }),
  },
} as any

describe(`bud.entry`, function () {
  let method: method

  beforeEach(async () => {
    method = entry.bind(bud)
    jest.clearAllMocks()
  })

  it(`is a function`, () => {
    expect(method).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const ret = await method(`foo`)
    expect(ret).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    await method(`foo`)
    expect(bud.hooks.on).toHaveBeenCalledTimes(1)
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
    await method(`foo`)
    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.entry`,
      expect.any(Function),
    )
  })

  it(`should accept a string`, async () => {
    await method(`foo`)

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.entry`,
      expect.any(Function),
    )

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        bud: {import: [`foo`]},
      }),
    )
  })

  it(`should accept an array`, async () => {
    await method([`foo`])

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.entry`,
      expect.any(Function),
    )

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        bud: {import: [`foo`]},
      }),
    )
  })

  it(`should accept an object`, async () => {
    await method({
      foo: `foo`,
    })

    expect(bud.hooks.on).toHaveBeenCalledWith(
      `build.entry`,
      expect.any(Function),
    )

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        foo: {import: [`foo`]},
      }),
    )
  })
})
