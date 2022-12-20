import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Config} from './config.js'

describe(`s3 config`, () => {
  let config

  beforeEach(async () => {
    vi.clearAllMocks()

    config = new Config()
  })

  it(`should set s3 credentials`, () => {
    config.set(`credentials`, {
      accessKeyId: `foo`,
      secretAccessKey: `bar`,
    })
    expect(config.credentials).toEqual(
      expect.objectContaining({
        accessKeyId: `foo`,
        secretAccessKey: `bar`,
      }),
    )
  })

  it(`should get a value`, () => {
    expect(config.get(`region`)).toEqual(config.region)
  })
})
