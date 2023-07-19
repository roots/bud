import {type Bud, factory} from '@repo/test-kit'
import {hash} from '@roots/bud-api/methods/hash'
import {beforeEach, describe, expect, it, vi} from 'vitest'

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

  it(`should return bud`, () => {
    expect(subject()).toEqual(bud)
  })
})
