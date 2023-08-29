import {Bud, factory} from '@repo/test-kit'
import * as hot from '@roots/bud-server/middleware/hot'
import {beforeAll, describe, expect, it, vi} from 'vitest'

describe(`@roots/bud-server/middleware/hot`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`})
    bud.compiler.instance = {
      hooks: {
        done: {
          tap: vi.fn(),
        },
        invalid: {
          tap: vi.fn(),
        },
      },
    }
  })

  it(`should be a function`, () => {
    expect(hot.factory).toBeDefined()
  })

  it(`should return middleware which hooks to compiler instance`, () => {
    expect(hot.factory(bud)).toBeInstanceOf(Function)
    expect(bud.compiler.instance.hooks.done.tap).toHaveBeenCalledWith(
      `bud-hot-middleware`,
      expect.any(Function),
    )
    expect(bud.compiler.instance.hooks.invalid.tap).toHaveBeenCalledWith(
      `bud-hot-middleware`,
      expect.any(Function),
    )
  })
})
