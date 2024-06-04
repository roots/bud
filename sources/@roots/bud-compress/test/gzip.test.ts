import {Bud, factory} from '@repo/test-kit'
import BudCompress from '@roots/bud-compress'
import BudGzip from '@roots/bud-compress/gzip'
import {beforeEach, describe, expect, it} from 'vitest'

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
})
