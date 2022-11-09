import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {persist} from './index.js'

describe(`bud.persist`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await factory()
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
    const successSpy = vi.spyOn(bud, `success`)
    subject()
    expect(successSpy).toHaveBeenCalledWith(`cache enabled`)
  })

  it(`should call bud.success to log param`, () => {
    const successSpy = vi.spyOn(bud, `success`)
    subject(true)
    expect(successSpy).toHaveBeenCalledWith(`cache enabled`)
  })

  it(`should call bud.success to log param`, () => {
    const successSpy = vi.spyOn(bud, `success`)
    subject(false)
    expect(successSpy).toHaveBeenCalledWith(`cache disabled`)
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
