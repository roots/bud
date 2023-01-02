import {describe, expect, it} from 'vitest'

import getServer from './getServer.js'

describe(`getServer`, () => {
  it(`should return false for no dev url`, () => {
    expect(getServer(undefined)).toBe(false)
  })

  it(`should return false for no protocol`, () => {
    expect(getServer(undefined)).toBe(false)
  })

  it(`should return object matching url`, () => {
    expect(getServer(new URL(`http://example.com:3000`))).toEqual(
      expect.objectContaining({
        internal: expect.any(String),
        external: expect.any(String),
      }),
    )
  })
})
