import {beforeEach, describe, expect, it} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'
import type {Configuration} from 'webpack'

import {config} from './config.method.js'

describe(`bud.config`, function () {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory({args: {dry: true}})
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
    const result = await config
      .bind(bud)(conf => ({...conf, entry: undefined}))
      .build.make()

    expect(result.entry).toBeUndefined()
    expect(result.context).toEqual(expect.stringContaining(`tests/util`))
  })
})
