import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {hash} from './index.js'

describe(`bud.hash`, () => {
  let bud
  let subject

  beforeEach(async () => {
    bud = await factory()
    subject = hash.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    const onSpy = vi.spyOn(bud.hooks, `on`)
    subject()
    expect(onSpy).toHaveBeenCalled()
  })

  it(`should call bud.success to log param`, () => {
    const successSpy = vi.spyOn(bud, `success`)
    subject()
    expect(successSpy).toHaveBeenCalledWith(`file hashing enabled`)
  })

  it(`should call bud.success to log param`, () => {
    const successSpy = vi.spyOn(bud, `success`)
    subject(true)
    expect(successSpy).toHaveBeenCalledWith(`file hashing enabled`)
  })

  it(`should call bud.success to log param`, () => {
    const successSpy = vi.spyOn(bud, `success`)
    subject(false)
    expect(successSpy).toHaveBeenCalledWith(`file hashing disabled`)
  })

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
