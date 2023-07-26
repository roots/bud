import {Bud, factory} from '@repo/test-kit'
import BudCompress from '@roots/bud-compress'
import BudBrotli from '@roots/bud-compress/brotli'
import BudGzip from '@roots/bud-compress/gzip'
import {beforeEach, describe, expect, it, vitest} from 'vitest'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: BudCompress
  let brotli: BudBrotli

  beforeEach(async () => {
    bud = await factory()
    brotli = new BudBrotli(bud)
    compress = new BudCompress(bud)

    await bud.extensions.add([BudBrotli, BudGzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(brotli).toBeInstanceOf(BudBrotli)
  })

  it(`should call enabled when config is called`, () => {
    const enableSpy = vitest.spyOn(brotli, `enable`)
    brotli.config()
    expect(enableSpy).toHaveBeenCalled()
  })
  it(`should call setOptions when config is called`, () => {
    const options = {
      algorithm: `test.algorithm`,
      compressionOptions: {test: `option`},
      deleteOriginalAssets: false,
      filename: `test.filename`,
      minRatio: 0.1,
      test: /test-regex$/,
      threshold: 9001,
    }
    const setOptionsSpy = vitest.spyOn(brotli, `setOptions`)
    brotli.config(options)
    expect(setOptionsSpy).toHaveBeenCalledWith(options)
  })
})
