import {beforeEach, describe, expect, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'
import {mockExtension} from '@repo/test-kit/mocks/extensions'

import {provide} from './index'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.provide`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
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
    subject({foo: [`bar`]})

    expect(bud.extensions.get).toHaveBeenCalled()
    expect(mockExtension.getOptions).toHaveBeenCalled()
    expect(mockExtension.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({foo: [`bar`]}),
    )
  })

  it(`should return bud`, () => {
    expect(subject({foo: [`bar`]})).toEqual(bud)
  })
})
