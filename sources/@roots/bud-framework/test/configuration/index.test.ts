import {type Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import * as configuration from '../../src/configuration/index.js'

describe(`bud.configuration`, function () {
  let bud: Bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
  })

  it(`should have a process fn`, () => {
    expect(configuration.process).toBeInstanceOf(Function)
  })
})
