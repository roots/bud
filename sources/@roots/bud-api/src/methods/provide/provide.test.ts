import mockBud from '@repo/test-kit/mocks/bud'
import {mockExtension} from '@repo/test-kit/mocks/extensions'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {provide} from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

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
    subject({jquery: [`$`, `jQuery`]})

    expect(bud.extensions.get).toHaveBeenCalled()
    expect(mockExtension.getOptions).toHaveBeenCalled()
    expect(mockExtension.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        jQuery: `jquery`,
        $: `jquery`,
      }),
    )
  })

  it(`should return bud`, () => {
    expect(subject({foo: [`bar`]})).toEqual(bud)
  })
})
