import {Bud, factory} from '@repo/test-kit'
import BudCompress from '@roots/bud-compress'
import BudBrotli from '@roots/bud-compress/brotli'
import BudGzip from '@roots/bud-compress/gzip'
import {beforeEach, describe, expect, it, test} from 'vitest'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: BudCompress

  beforeEach(async () => {
    bud = await factory()
    compress = new BudCompress(bud)
    await bud.extensions.add([BudBrotli, BudGzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(BudCompress).toBeInstanceOf(Function)
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
