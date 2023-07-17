import {Bud, factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it, vitest} from 'vitest'

import Compression from './extension.js'
import Gzip from './gzip.js'

describe(`@roots/bud-compress`, () => {
  let bud: Bud
  let compress: Compression
  let gzip: Gzip

  beforeEach(async () => {
    bud = await factory()
    gzip = new Gzip(bud)
    compress = new Compression(bud)

    await bud.extensions.add([Gzip])
    await compress.register(bud)
  })

  it(`should be constructable`, () => {
    expect(gzip).toBeInstanceOf(Gzip)
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
