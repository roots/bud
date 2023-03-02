import {factory, Bud} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, test} from 'vitest'
import BudBrotli from './brotli.js'
import BudGzip from './gzip.js'

import Extension from './index.js'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: Extension

  beforeEach(async () => {
    bud = await factory()
    compress = new Extension(bud)
    await bud.extensions.add([BudBrotli, BudGzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })

  it(`should have gzip interface`, () => {
    expect(compress.gzip).toBeInstanceOf(BudGzip)
  })

  it(`should have br interface`, () => {
    expect(compress.brotli).toBeInstanceOf(BudBrotli)
  })

  it(`should have gzip disabled`, () => {
    expect(compress.gzip.enabled).toBe(false)
  })

  it(`should have brotli disabled`, () => {
    expect(compress.brotli.enabled).toBe(false)
  })
})
