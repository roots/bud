import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {provide as provideFn} from './index.js'

describe(`bud.provide`, () => {
  let bud
  let provide

  beforeEach(async () => {
    bud = await factory()
    provide = provideFn.bind(bud)
  })

  it(`should thrown when no packages are provided`, async () => {
    try {
      expect(await provide()).toThrowError(
        `bud.provide: packages must be an object`,
      )
    } catch (e) {}
  })

  it(`should call mockExtension.get when called`, async () => {
    const getSpy = vi.spyOn(bud.extensions, `get`)
    await provide({jquery: [`$`, `jQuery`]})

    expect(getSpy).toHaveBeenCalled()
  })

  it(`should return bud`, async () => {
    expect(await provide({foo: [`bar`]})).toEqual(bud)
  })
})
