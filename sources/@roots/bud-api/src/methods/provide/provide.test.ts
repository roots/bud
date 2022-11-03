import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {provide} from './index'

describe(`bud.provide`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await factory()
    subject = provide.bind(bud)
  })

  it(`should thrown when no packages are provided`, () => {
    try {
      expect(subject()).toThrowError(
        `bud.provide: packages must be an object`,
      )
    } catch (e) {}
  })

  it(`should call mockExtension.get when called`, () => {
    const getSpy = vi.spyOn(bud.extensions, `get`)
    subject({jquery: [`$`, `jQuery`]})

    expect(getSpy).toHaveBeenCalled()
  })

  it(`should return bud`, () => {
    expect(subject({foo: [`bar`]})).toEqual(bud)
  })
})
