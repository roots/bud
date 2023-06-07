import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Client} from '../../src/s3/client.js'
import * as SDK from '../../vendor/sdk/index.cjs'

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
    expect(await client.make({})).toBeInstanceOf(SDK.S3Client)
  })
})
