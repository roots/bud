import {describe, expect, it} from 'vitest'

import * as pkg from './index.js'
import {Server} from './service/service'

describe(`@roots/bud-server`, () => {
  describe(`exports`, () => {
    it(`should export Service`, () => {
      expect(pkg.default).toBe(Server)
    })
  })
})
