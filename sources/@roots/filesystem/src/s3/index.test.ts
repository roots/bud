import {beforeEach, describe, expect, it, vi} from 'vitest'

import {S3} from './index.js'

const mockSDKImplementation = {
  send: vi.fn(),
}

const mockConfigImplementation = {
  credentials: {
    accessKeyId: `foo`,
    secretAccessKey: `bar`,
  },
  region: `us-east-1`,
  endpoint: `https://s3.amazonaws.com`,
  get: vi.fn(),
  set: vi.fn(),
}
mockConfigImplementation.get = vi.fn(
  (key: string) => mockConfigImplementation[key],
)
mockConfigImplementation.set = vi.fn(
  (key: string, value) => (mockConfigImplementation[key] = value),
)

const mockClient = vi.fn().mockImplementation(() => ({
  make: vi.fn(() => mockSDKImplementation),
}))

const mockConfigModule = vi
  .fn()
  .mockImplementation(() => mockConfigImplementation)

describe(`s3`, () => {
  let s3: S3

  beforeEach(async () => {
    vi.clearAllMocks()
    s3 = new S3()
    s3.client = new mockClient()
    s3.config = new mockConfigModule()
  })

  it(`should return the ident for DO`, async () => {
    s3.config.set(`endpoint`, `https://nyc3.digitaloceanspaces.com`)
    s3.config.set(`bucket`, `foo`)
    expect(s3.ident).toEqual(`https://foo.nyc3.digitaloceanspaces.com`)
  })

  it(`should return the ident for AWS`, async () => {
    s3.config.set(`region`, `us-west-1`)
    s3.config.set(`endpoint`, null)
    s3.config.set(`bucket`, `foo`)
    expect(s3.ident).toEqual(`foo (us-west-1)`)
  })

  it(`should set s3 region`, async () => {
    await s3.config.set(`region`, `foo`)
    expect(s3.config.set).toHaveBeenCalledWith(`region`, `foo`)
  })

  it(`should call sdk.send when writing a file`, async () => {
    await s3.write(`foo.txt`, `bar`)
    expect(s3.client.make).toHaveBeenCalled()
  })

  it(`should not call s3.client.make when a bad mimetype is passed`, async () => {
    await s3.write(`foo`, `bar`)

    expect(s3.client.make).not.toHaveBeenCalled()
  })

  it(`should call s3.client.make when s3.list is called`, async () => {
    await s3.list()
    expect(s3.client.make).toHaveBeenCalled()
  })

  it(`should call s3.client.make when s3.delete is called`, async () => {
    await s3.delete(`foo`)
    expect(s3.client.make).toHaveBeenCalled()
  })

  it(`should call s3.client.make when s3.read is called`, async () => {
    await s3.read(`foo`, true)
    expect(s3.client.make).toHaveBeenCalled()
  })

  it(`should throw if attempt to access client is made and credentials aren't set`, async () => {
    try {
      await s3.getClient()
    } catch (e) {
      expect(e.message).toBe(
        `S3 credentials are required. Did you forget to set them?`,
      )
    }
  })

  it(`should call s3.list from s3.exists`, async () => {
    const listSpy = vi.spyOn(s3, `list`)
    try {
      await s3.exists(`foo`)
    } catch (e) {}
    expect(listSpy).toHaveBeenCalled()
  })
})
