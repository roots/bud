import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {after as subject} from './after'

describe(`bud.after`, function () {
  let after: subject
  let bud

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
