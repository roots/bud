import {S3} from '@aws-sdk/client-s3'
import {describe, jest} from '@jest/globals'

import Client from './client.js'

describe(`s3 client`, () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  it(`should have a static Client.make fn`, () => {
    expect(Client.make).toBeInstanceOf(Function)
  })

  it(`should return s3 client from Client.make`, () => {
    expect(Client.make({})).toBeInstanceOf(S3)
  })
})
