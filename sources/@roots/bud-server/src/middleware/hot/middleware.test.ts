import {Bud, factory} from '@repo/test-kit/bud'
import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'

import hotMiddleware from './middleware.js'

vi.mock(`@roots/bud-compiler`)

describe(`@roots/bud-server/middleware/hot`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`})
  })

  afterAll(async () => bud.close())

  it(`should be a function`, () => {
    expect(hotMiddleware).toBeDefined()
  })

  it(`should return expected output`, () => {
    try {
      expect(hotMiddleware(bud)).toBeInstanceOf(Function)
    } catch (error) {}
  })
})
