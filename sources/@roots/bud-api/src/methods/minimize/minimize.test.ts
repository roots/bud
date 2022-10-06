import {beforeEach, describe, expect, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import {minimize} from './index'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

const mockExtension = {
  enable: jest.fn(),
  disable: jest.fn(),
}

describe(`bud.minimize`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    bud.extensions.get = jest.fn(() => mockExtension)

    subject = minimize.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    subject()
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`should call bud.hooks.filter when called`, () => {
    subject()
    expect(bud.hooks.filter).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with truthy value`, () => {
    bud.hooks.filter = jest.fn(() => true)
    subject(true)
    expect(mockExtension.enable).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with falsy value`, () => {
    bud.hooks.filter = jest.fn(() => false)
    subject(false)
    expect(mockExtension.disable).toHaveBeenCalled()
  })

  it(`should call bud.success to log param`, () => {
    subject()
    expect(bud.success).toHaveBeenCalledWith(`minimize enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(true)
    expect(bud.success).toHaveBeenCalledWith(`minimize enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(false)
    expect(bud.success).toHaveBeenCalledWith(`minimize disabled`)
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
