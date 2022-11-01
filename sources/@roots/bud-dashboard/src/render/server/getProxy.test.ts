import {describe, expect, it, vi} from 'vitest'

import getProxy from './getProxy'

describe(`getProxy`, () => {
  it(`should return false for no dev url`, () => {
    expect(getProxy(undefined)).toBe(false)
  })

  it(`should return false for no hostname/protocol/port`, () => {
    expect(
      getProxy({
        // @ts-ignore
        hostname: false,
        // @ts-ignore
        protocol: false,
        // @ts-ignore
        port: false,
      }),
    ).toBe(false)
  })

  it(`should return object matching url`, () => {
    expect(getProxy(new URL(`http://example.com:3000`))).toEqual(
      expect.stringMatching(/^http:\/\/example\.com:.*/),
    )
  })
})
