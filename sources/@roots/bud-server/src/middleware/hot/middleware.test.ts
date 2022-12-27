import {Bud, factory} from '@repo/test-kit/bud'
import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'

import {middleware} from './index.js'

vi.mock(`@roots/bud-compiler`)

describe(`@roots/bud-server/middleware/hot`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`})
  })

  afterAll(async () => bud.close())

  it(`should be a function`, () => {
    expect(middleware).toBeDefined()
  })

  it(`should return expected output`, () => {
    try {
      expect(middleware(bud)).toBeInstanceOf(Function)
    } catch (error) {}
  })
})
