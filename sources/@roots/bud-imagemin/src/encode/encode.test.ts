import '../types.js'

import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud, factory} from '@repo/test-kit/bud'

import {BudImageminExtension} from '../extension.js'

describe(`@roots/bud-imagemin`, () => {
  let bud: Bud

  beforeEach(async () => {
    bud = await factory()
  })

  it(`should set minimizer encodeOptions when encode fn is called`, async () => {
    await bud.extensions.add(BudImageminExtension)

    bud.imagemin.encode(`jpg`, {test: `case`})

    expect(
      bud.imagemin.minimizers.get(`squoosh`).minimizer.options
        .encodeOptions.mozjpeg,
    ).toEqual(expect.objectContaining({test: `case`}))
  })
})
