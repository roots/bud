import {S3} from '@aws-sdk/client-s3'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Client from './client.js'

describe(`s3 client`, () => {
  beforeEach(async () => {
    vi.clearAllMocks()
  })

  it(`should have a static Client.make fn`, () => {
    expect(Client.make).toBeInstanceOf(Function)
  })

  it(`should return s3 client from Client.make`, () => {
    expect(Client.make({})).toBeInstanceOf(S3)
  })
})
