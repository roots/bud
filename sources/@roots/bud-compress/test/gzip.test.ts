import {Bud, factory} from '@repo/test-kit'
import BudCompress from '@roots/bud-compress'
import BudGzip from '@roots/bud-compress/gzip'
import {beforeEach, describe, expect, it, vitest} from 'vitest'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: BudCompress
  let gzip: BudGzip

  beforeEach(async () => {
    bud = await factory()
    gzip = new BudGzip(bud)
    compress = new BudCompress(bud)

    await bud.extensions.add([BudGzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(gzip).toBeInstanceOf(BudGzip)
  })

  it(`should call enabled when config is called`, () => {
    const enableSpy = vitest.spyOn(gzip, `enable`)
    gzip.config()
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
    const setOptionsSpy = vitest.spyOn(gzip, `setOptions`)
    gzip.config(options)
    expect(setOptionsSpy).toHaveBeenCalledWith(options)
  })
})
