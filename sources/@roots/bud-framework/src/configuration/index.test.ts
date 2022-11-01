import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as configuration from './index'

describe(`bud.configuration`, function () {
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`should have a process fn`, () => {
    expect(configuration.process).toBeInstanceOf(Function)
  })

  it(`should have a getAllMatchingConfigs fn`, async () => {
    expect(configuration.getAllMatchingConfigs).toBeInstanceOf(Function)
  })
})
