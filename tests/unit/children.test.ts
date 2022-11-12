import {Bud, factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud-framework child`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it("root compiler's name should be `@tests/project`", () => {
    try {
      expect(bud.label).toBe(`@tests/project`)
    } catch (error) {
      throw new Error(error)
    }
  })

  it(`root compiler's isRoot prop should be true`, () => {
    try {
      expect(bud.isRoot).toBe(true)
    } catch (error) {
      throw new Error(error)
    }
  })

  it(`should produce child with self at root`, async () => {
    const callback = vi.fn(async (app: Bud) => null)
    await bud.make(`@tests/project-child`, callback)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
