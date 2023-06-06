import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {hash} from './index.js'

describe(`bud.hash`, () => {
  let bud: Bud
  let subject: typeof hash

  beforeEach(async () => {
    bud = await factory()
    subject = hash.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    bud.context.hash = false
    subject()
    expect(bud.context.hash).toBe(true)

    subject(false)
    expect(bud.context.hash).toBe(false)

    subject(hash => !hash)
    expect(bud.context.hash).toBe(true)
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
