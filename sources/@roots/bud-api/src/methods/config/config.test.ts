import {describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import {config} from './config.method.js'

describe(`bud.config`, function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it(`should be a function`, () => {
    expect(config).toBeInstanceOf(Function)
  })

  it(`should return bud`, () => {
    expect(config.call(bud, {})).toBeInstanceOf(Bud)
  })

  it(`should throw with no input`, () => {
    expect(() => config.call(bud)).toThrow()
  })

  it(`should accept object configuration`, async () => {
    config.call(bud, {entry: `foo`})

    const result = await bud.build.make()
    expect(result.entry).toEqual(`foo`)
  })

  it(`should accept a callback function`, async () => {
    config.call(bud, conf => ({
      ...conf,
      entry: undefined,
    }))

    const result = await bud.build.make()
    expect(result.entry).toBeUndefined()
    expect(result.context).toEqual(expect.stringContaining(`tests/util`))
  })
})
