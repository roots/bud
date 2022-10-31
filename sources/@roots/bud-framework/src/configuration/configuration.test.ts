import {beforeEach, describe, expect, it, jest} from '@jest/globals'
import mockBud from '@repo/test-kit/mocks/bud'

import Configuration from './configuration'

jest.unstable_mockModule(`@roots/bud`, () => ({default: mockBud}))

describe(`bud.after`, function () {
  let configuration: Configuration

  beforeEach(async () => {
    jest.clearAllMocks()
    const bud = (await import(`@roots/bud`).then(
      ({default: Bud}) => new Bud(),
    )) as any
    configuration = new Configuration(bud)
  })

  it(`is constructable`, () => {
    expect(configuration).toBeInstanceOf(Configuration)
  })

  it(`has a run method`, async () => {
    expect(configuration.run).toBeInstanceOf(Function)
  })
})
