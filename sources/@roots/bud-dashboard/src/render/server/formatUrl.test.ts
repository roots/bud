import {describe, expect, it} from '@jest/globals'
import {externalNetworkInterface} from '@roots/bud-support/os'

import * as formatUrl from './formatUrl'

describe(`formatUrl`, () => {
  describe(`internal`, () => {
    it(`should return a formatted string`, () => {
      expect(formatUrl.internal(`http:`, `example.com`, `:3000`)).toBe(
        `http://example.com:3000`,
      )
    })

    it(`should return localhost instead of 0.0.0.0`, () => {
      expect(formatUrl.internal(`http:`, `0.0.0.0`, `:3000`)).toBe(
        `http://localhost:3000`,
      )
    })

    it(`should return localhost instead of external ipv4`, () => {
      expect(
        formatUrl.internal(
          `http:`,
          externalNetworkInterface.ipv4,
          `:8080`,
        ),
      ).toBe(`http://localhost:8080`)
    })
  })

  describe(`external`, () => {
    it(`should return a formatted string`, () => {
      expect(formatUrl.external(`http:`, `example.com`, `:3000`)).toBe(
        `http://example.com:3000`,
      )
    })
  })
})
