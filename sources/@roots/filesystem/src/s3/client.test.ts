import {S3} from '@aws-sdk/client-s3'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Client} from './client.js'

describe(`s3 client`, () => {
  let client
  beforeEach(async () => {
    vi.clearAllMocks()
    client = new Client()
  })

  it(`should have a static Client.make fn`, () => {
    expect(client.make).toBeInstanceOf(Function)
  })

  it(`should return s3 client from Client.make`, async () => {
    expect(await client.make({})).toBeInstanceOf(S3)
  })
})
