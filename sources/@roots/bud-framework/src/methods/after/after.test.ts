import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import {after as subject} from './after'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.after`, function () {
  let after: subject
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = await import(`@roots/bud`).then(({default: Bud}) => new Bud())
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
