import {factory, Bud} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vitest} from 'vitest'
import BudBrotli from './brotli.js'
import BudGzip from './gzip.js'

import Brotli from './brotli.js'
import Compression from './extension.js'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: Compression
  let brotli: Brotli

  beforeEach(async () => {
    bud = await factory()
    brotli = new Brotli(bud)
    compress = new Compression(bud)

    await bud.extensions.add([BudBrotli, BudGzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(brotli).toBeInstanceOf(Brotli)
  })

  it(`should call enabled when config is called`, () => {
    const enableSpy = vitest.spyOn(brotli, 'enable')
    brotli.config()
    expect(enableSpy).toHaveBeenCalled()
  })
  it(`should call setOptions when config is called`, () => {
    const options = {
      algorithm: `test.algorithm`,
      filename: `test.filename`,
      test: /test-regex$/,
      compressionOptions: {test: `option`},
      threshold: 9001,
      minRatio: 0.1,
      deleteOriginalAssets: false,
    }
    const setOptionsSpy = vitest.spyOn(brotli, 'setOptions')
    brotli.config(options)
    expect(setOptionsSpy).toHaveBeenCalledWith(options)
  })
})
