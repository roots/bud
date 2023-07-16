import {type Bud, factory} from '@repo/test-kit'
import {after as subject} from '@roots/bud-framework/methods/after'
import {beforeEach, describe, expect, it} from 'vitest'

describe(`bud.after`, function () {
  let after: subject
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
    after = subject.bind(bud)
  })

  it(`is a function`, () => {
    expect(after).toBeInstanceOf(Function)
  })

  it(`returns Bud`, async () => {
    const value = after(async () => {})
    expect(value).toBe(bud)
  })
})
