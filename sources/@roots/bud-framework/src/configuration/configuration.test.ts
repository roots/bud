import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Configuration from './configuration'

describe(`bud.after`, function () {
  let configuration: Configuration
  let bud

  beforeEach(async () => {
    vi.clearAllMocks()
    bud = await factory()
    configuration = new Configuration(bud)
  })

  it(`is constructable`, () => {
    expect(configuration).toBeInstanceOf(Configuration)
  })

  it(`has a run method`, async () => {
    expect(configuration.run).toBeInstanceOf(Function)
  })
})
