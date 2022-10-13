import {describe, expect} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import {xml} from './xml'

describe(`xml loader`, () => {
  let bud

  it(`should return a rule`, async () => {
    bud = await factory()
    const result = await xml(bud)
    const webpackOutput = result.toWebpack()
    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({ident: `xml`, loader: `xml-loader`}),
    )
  })
})
