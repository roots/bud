import {describe} from '@jest/globals'

import * as pkg from './index'
import middlewareSpecification from './middleware/middleware.spec'
import {Server} from './service/service'
import serviceSpecification from './service/service.spec'

describe(`@roots/bud-server`, () => {
  describe(`exports`, () => {
    it(`should export Service`, () => {
      expect(pkg.default).toBe(Server)
    })
  })

  describe(`@roots/bud-server/middleware`, middlewareSpecification)

  describe(`@roots/bud-server/service`, serviceSpecification)
})
