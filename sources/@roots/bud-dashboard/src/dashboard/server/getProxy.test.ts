import {describe, expect, it} from 'vitest'

import getProxy from './getProxy.js'

describe(`getProxy`, () => {
  it(`should return false for no dev url`, () => {
    expect(getProxy(undefined)).toBe(false)
  })

  it(`should return joined hostname/protocol/port`, () => {
    expect(getProxy(new URL(`http://localhost:3000`))).toBe(
      `http://localhost:3000`,
    )
  })

  it(`should return false for no hostname/protocol/port`, () => {
    expect(getProxy(new URL(`https://localhost:8080`))).toBe(
      `https://localhost`,
    )
  })

  it(`should return object matching url`, () => {
    expect(getProxy(new URL(`http://example.com:3000`))).toEqual(
      expect.stringMatching(/^http:\/\/example\.com:3000.*/),
    )
  })
})
