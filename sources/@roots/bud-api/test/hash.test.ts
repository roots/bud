import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import {hash} from '../src/methods/hash'

describe(`@roots/bud-api/methods/hash`, () => {
  let bud: Bud
  let subject: typeof hash

  beforeEach(async () => {
    bud = await factory()
    subject = hash.bind(bud)
  })

  it(`should call bud.hooks.on when called`, () => {
    bud.context.hash = false
    // @ts-ignore
    subject()
    expect(bud.context.hash).toBe(true)

    subject(false)
    expect(bud.context.hash).toBe(false)

    subject(hash => !hash)
    expect(bud.context.hash).toBe(true)
  })

  it(`should return bud`, () => {
    // @ts-ignore
    expect(subject()).toEqual(bud)
  })
})
