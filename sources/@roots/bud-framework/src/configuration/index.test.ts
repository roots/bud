import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import * as configuration from './index'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.configuration`, function () {
  let bud

  beforeEach(async () => {
    jest.clearAllMocks()
    bud = (await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )) as any
  })

  it(`should have a process fn`, () => {
    expect(configuration.process).toBeInstanceOf(Function)
  })

  it(`should have a getAllMatchingConfigs fn`, async () => {
    expect(configuration.getAllMatchingConfigs).toBeInstanceOf(Function)
  })
})
