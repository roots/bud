import {describe, expect, it} from 'vitest'

import * as exports from './index.js'

describe(`@roots/bud-server/middleware`, () => {
  it(`should export dev factory`, () => {
    expect(exports.dev.factory).toBeInstanceOf(Function)
  })

  it(`should export cookie factory`, () => {
    expect(exports.cookie.factory).toBeInstanceOf(Function)
  })

  it(`should export hot factory`, () => {
    expect(exports.hot.factory).toBeInstanceOf(Function)
  })

  it(`should export proxy factory`, () => {
    expect(exports.proxy.factory).toBeInstanceOf(Function)
  })
})
