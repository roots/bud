import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {entry as entryFn} from './index.js'

describe(`bud.entry`, function () {
  let bud
  let entry: entryFn

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    entry = entryFn.bind(bud)
  })

  it(`is a function`, () => {
    expect(entry).toBeInstanceOf(Function)
  })

  it(`should return bud`, async () => {
    const ret = await entry(`foo`)
    expect(ret).toBe(bud)
  })

  it(`should call bud.hooks.on one time`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await entry(`foo`)
    expect(onSpy).toHaveBeenCalledTimes(1)
  })

  it(`should throw when a string is passed as arg0 and a non-array/string as arg1`, async () => {
    try {
      expect(
        // @ts-ignore
        await entry([`foo`], {bar: `bar`}),
      ).toThrow()
    } catch (e) {}
  })

  it(`should call bud.hooks.on with expected arguments`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    await entry(`foo`)
    expect(onSpy).toHaveBeenCalledWith(
      `build.entry`,
      expect.objectContaining({
        [`foo`]: {import: [`foo`]},
      }),
    )
  })

  it(`should accept a string`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await entry(`foo`)

    expect(onSpy).toHaveBeenCalledWith(
      `build.entry`,
      expect.objectContaining({
        [`foo`]: {import: [`foo`]},
      }),
    )
  })

  it(`should accept an array`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await entry([`foo`])

    expect(onSpy).toHaveBeenCalledWith(
      `build.entry`,
      expect.objectContaining({
        [`foo`]: {import: [`foo`]},
      }),
    )
  })

  it(`should accept an object`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    await entry({bar: `bar.js`})

    expect(onSpy).toHaveBeenCalledWith(
      `build.entry`,
      expect.objectContaining({
        bar: {import: [`bar.js`]},
      }),
    )
  })

  it(`should accept a mixed type`, async () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)

    // @ts-ignore
    await entry({
      primitiveString: `primitiveString.js`,
      primitiveArray: [`primitiveArray1.js`, `primitiveArray2.js`],
      normalRecord: {
        import: [`normalRecordImport1.js`, `normalRecordImport2.js`],
        dependsOn: [`primitiveString`],
      },
    })

    expect(onSpy).toHaveBeenNthCalledWith(
      1,
      `build.entry`,
      expect.objectContaining({
        primitiveString: {import: [`primitiveString.js`]},
      }),
    )

    expect(onSpy).toHaveBeenNthCalledWith(
      2,
      `build.entry`,
      expect.objectContaining({
        primitiveString: {import: [`primitiveString.js`]},
        primitiveArray: {
          import: [`primitiveArray1.js`, `primitiveArray2.js`],
        },
      }),
    )

    expect(onSpy).toHaveBeenNthCalledWith(
      3,
      `build.entry`,
      expect.objectContaining({
        primitiveString: {import: [`primitiveString.js`]},
        primitiveArray: {
          import: [`primitiveArray1.js`, `primitiveArray2.js`],
        },
        normalRecord: {
          import: [`normalRecordImport1.js`, `normalRecordImport2.js`],
          dependsOn: [`primitiveString`],
        },
      }),
    )
  })
})
