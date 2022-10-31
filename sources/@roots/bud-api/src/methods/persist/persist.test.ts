import mockBud from '@repo/test-kit/mocks/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {persist} from './index'

vi.mock(`@roots/bud`, () => ({default: mockBud}))

const mockExtension = {
  enable: vi.fn(),
  disable: vi.fn(),
}

describe(`bud.persist`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
    subject = persist.bind(bud)
  })

  it(`should set cache to filesystem when callled`, () => {
    subject()
    expect(bud.cache.type).toBe(`filesystem`)
  })

  it(`should set cache to memory when called`, () => {
    subject(`memory`)
    expect(bud.cache.type).toBe(`memory`)
  })

  it(`should set cache.enabled to true when called with no params`, () => {
    subject()
    expect(bud.cache.enabled).toBe(true)
  })

  it(`should set cache.enabled to true when called with no params`, () => {
    subject(`filesystem`)
    expect(bud.cache.enabled).toBe(true)
  })

  it(`should set cache.enabled to false when called with falsy value`, () => {
    subject(false)
    expect(bud.cache.enabled).toBe(false)
  })

  it(`should call bud.success to log param`, () => {
    subject()
    expect(bud.success).toHaveBeenCalledWith(`cache enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(true)
    expect(bud.success).toHaveBeenCalledWith(`cache enabled`)
  })

  it(`should call bud.success to log param`, () => {
    subject(false)
    expect(bud.success).toHaveBeenCalledWith(`cache disabled`)
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
