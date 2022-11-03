import {beforeEach, describe, expect, it, vi} from 'vitest'

import S3 from './index.js'

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
  let s3

  beforeEach(async () => {
    // @ts-ignore
    s3 = new S3()
    s3.client = new mockClient()
    s3.config = new mockConfigModule()
  })

  it(`should set s3 credentials`, async () => {
    await s3.setCredentials({
      accessKeyId: `foo`,
      secretAccessKey: `bar`,
    })
    expect(s3.config.set).toHaveBeenCalledWith(`credentials`, {
      accessKeyId: `foo`,
      secretAccessKey: `bar`,
    })
  })

  it(`should return the ident for DO`, async () => {
    s3.setEndpoint(`https://nyc3.digitaloceanspaces.com`)
    s3.setBucket(`foo`)
    expect(s3.ident).toEqual(`https://foo.nyc3.digitaloceanspaces.com`)
  })

  it(`should return the ident for AWS`, async () => {
    s3.setRegion(`us-west-1`)
    s3.setEndpoint(null)
    s3.setBucket(`foo`)
    expect(s3.ident).toEqual(`foo (us-west-1)`)
  })

  it(`should set s3 region`, async () => {
    await s3.setRegion(`foo`)
    expect(s3.config.set).toHaveBeenCalledWith(`region`, `foo`)
  })

  it(`should get s3 region`, async () => {
    await s3.getRegion()
    expect(s3.config.get).toHaveBeenCalledWith(`region`)
  })

  it(`should set s3 endpoint`, async () => {
    s3.setEndpoint(`foo`)
    expect(s3.config.set).toHaveBeenCalledWith(`endpoint`, `foo`)
  })

  it(`should get the s3 endpoint`, async () => {
    s3.getEndpoint()
    expect(s3.config.get).toHaveBeenCalledWith(`endpoint`)
  })

  it(`should set s3 bucket`, () => {
    s3.setBucket(`foo`)
    expect(s3.bucket).toEqual(`foo`)
  })

  it(`should get s3 bucket`, () => {
    s3.setBucket(`foo`)
    expect(s3.getBucket()).toEqual(`foo`)
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

  it(`should set public value when setPublic is called`, () => {
    s3.setPublic(false)
    expect(s3.public).toBeFalsy()
  })

  it(`should return the value of s3.isPublic when calling getPublic`, () => {
    expect(s3.getPublic()).toBeTruthy()
  })

  it(`should throw if attempt to access client is made and credentials aren't set`, async () => {
    s3.setCredentials(null)
    try {
      expect(s3.getClient).toThrow()
    } catch (e) {
      expect(e.message).toEqual(
        `S3 credentials are required. Did you forget to set them?`,
      )
    }
  })

  it(`should call s3.list from s3.exists`, async () => {
    const listSpy = vi.spyOn(s3, `list`)
    await s3.exists()
    expect(listSpy).toHaveBeenCalled()
  })
})
