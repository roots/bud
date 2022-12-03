import {externalNetworkInterface} from '@roots/bud-support/os'
import {describe, expect, it} from 'vitest'

import {formatUrl} from './formatUrl'

describe(`formatUrl`, () => {
  describe(`internal`, () => {
    it(`should return a formatted string`, () => {
      const url = new URL(`http://example.com:3000`)
      expect(formatUrl(url)).toBe(`http://example.com:3000`)
    })

    it(`should return localhost instead of 0.0.0.0`, () => {
      const url = new URL(`http://0.0.0.0:3000`)
      expect(formatUrl(url)).toBe(`http://localhost:3000`)
    })

    it(`should return localhost instead of 0.0.0.0`, () => {
      const url = new URL(`http://${externalNetworkInterface.ipv4}:3000`)
      expect(formatUrl(url)).toBe(`http://localhost:3000`)
    })
  })
})
