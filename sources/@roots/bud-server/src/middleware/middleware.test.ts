import {describe, expect, it} from 'vitest'

import {cookie} from './cookie/index'
import {dev} from './dev/index'
import hot from './hot/middleware'
import * as exports from './middleware'
import {proxy} from './proxy/index'

describe(`@roots/bud-server/middleware/proxy`, () => {
  it(`should export dev middleware`, () => {
    expect(exports.dev).toBe(dev)
  })

  it(`should export cookie middleware`, () => {
    expect(exports.cookie).toBe(cookie)
  })

  it(`should export hot middleware`, () => {
    expect(exports.hot).toBe(hot)
  })

  it(`should export proxy middleware`, () => {
    expect(exports.proxy).toBe(proxy)
  })
})
