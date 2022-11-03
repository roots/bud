import {Bud, factory} from '@repo/test-kit/bud'
import {beforeAll, describe, expect, it, vi} from 'vitest'

describe(`bud.close`, () => {
  let bud: Bud
  let mockCallback = vi.fn(() => null)

  beforeAll(async () => {
    bud = await factory()
  })

  it(`root.isRoot is false`, () => {
    bud.close(mockCallback)

    expect(mockCallback).toHaveBeenCalled()
  })
})
