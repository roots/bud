import {describe, expect} from '@jest/globals'
import {factory} from '@repo/test-kit/bud'

import {xml} from './xml'

describe(`xml loader`, () => {
  it(`should return a rule`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async ({factory}) => await factory(),
    )
    const result = xml(bud)

    const webpackOutput = result.toWebpack()
    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({ident: `xml`, loader: `xml-loader`}),
    )
  })
})
