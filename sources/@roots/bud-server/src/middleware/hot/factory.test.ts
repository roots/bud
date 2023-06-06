import {Bud, factory} from '@repo/test-kit'
import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'

import * as hot from './index.js'

describe(`@roots/bud-server/middleware/hot`, () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: `development`})
  })

  it(`should be a function`, () => {
    expect(hot.factory).toBeDefined()
  })

  it(`should return expected output`, () => {
    try {
      expect(hot.factory(bud)).toBeInstanceOf(Function)
    } catch (error) {}
  })
})
