import {describe, expect, it} from 'vitest'

import * as exports from './index.js'

describe(`@roots/bud-server/middleware/proxy`, () => {
  it(`should export dev middleware`, () => {
    expect(exports.dev.middleware).toBeInstanceOf(Function)
  })

  it(`should export cookie middleware`, () => {
    expect(exports.cookie.middleware).toBeInstanceOf(Function)
  })

  it(`should export hot middleware`, () => {
    expect(exports.hot.middleware).toBeInstanceOf(Function)
  })

  it(`should export proxy middleware`, () => {
    expect(exports.proxy.middleware).toBeInstanceOf(Function)
  })
})
