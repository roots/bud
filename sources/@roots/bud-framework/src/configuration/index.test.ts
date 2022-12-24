import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as configuration from './index.js'

describe(`bud.configuration`, function () {
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`should have a process fn`, () => {
    expect(configuration.process).toBeInstanceOf(Function)
  })
})
