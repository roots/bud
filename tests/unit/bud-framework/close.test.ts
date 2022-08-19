import {beforeAll, describe, expect, it, jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

describe(`bud.close`, () => {
  let bud: Bud
  let mockCallback = jest.fn(() => null)

  beforeAll(async () => (bud = await factory()))

  it(`root.isRoot is false`, () => {
    bud.close(mockCallback)

    expect(mockCallback).toHaveBeenCalled()
  })
})
