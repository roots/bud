import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {minimize as subject} from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

const mockExtension = {
  enable: vi.fn(),
  disable: vi.fn(),
}

describe(`bud.minimize`, () => {
  let bud
  let minimize

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    bud.extensions.get = vi.fn(() => mockExtension)

    minimize = subject.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    minimize()
    expect(bud.hooks.on).toHaveBeenCalled()
  })

  it(`should call bud.hooks.filter when called`, () => {
    minimize()
    expect(bud.hooks.filter).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with truthy value`, () => {
    bud.hooks.filter = vi.fn(() => true)
    minimize(true)
    expect(mockExtension.enable).toHaveBeenCalled()
  })

  it(`should call mockExtension.enable when called with falsy value`, () => {
    bud.hooks.filter = vi.fn(() => false)
    minimize(false)
    expect(mockExtension.disable).toHaveBeenCalled()
  })

  it(`should call bud.success to log param`, () => {
    minimize()
    expect(bud.success).toHaveBeenCalledWith(`minimize enabled`)
  })

  it(`should call bud.success to log param`, () => {
    minimize(true)
    expect(bud.success).toHaveBeenCalledWith(`minimize enabled`)
  })

  it(`should call bud.success to log param`, () => {
    minimize(false)
    expect(bud.success).toHaveBeenCalledWith(`minimize disabled`)
  })

  it(`should return bud`, () => {
    expect(minimize()).toEqual(bud)
  })
})
