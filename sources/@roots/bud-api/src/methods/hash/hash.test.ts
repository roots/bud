import {beforeEach, describe, expect, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import {hash} from './index'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.hash`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    subject = hash.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    subject()
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`should call bud.success to log param`, () => {
    subject()
    expect(bud.success).toHaveBeenCalledWith(`file hashing enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(true)
    expect(bud.success).toHaveBeenCalledWith(`file hashing enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(false)
    expect(bud.success).toHaveBeenCalledWith(`file hashing disabled`)
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
