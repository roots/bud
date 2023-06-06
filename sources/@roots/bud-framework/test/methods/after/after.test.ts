import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'

import {after as subject} from '../../../src/methods/after/after.js'

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
