import {describe, expect} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import {csv} from './csv'

describe(`csv loader`, () => {
  let bud

  it(`should return a rule`, async () => {
    bud = await factory()
    const result = await csv(bud)
    const webpackOutput = result.toWebpack()
    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({ident: `csv`, loader: `csv-loader`}),
    )
  })
})
