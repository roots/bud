import {describe, expect, it} from 'vitest'

import {csv} from './csv'

describe(`csv loader`, () => {
  it(`should return a rule`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async ({factory}) => await factory(),
    )
    const result = await csv(bud)

    const webpackOutput = result.toWebpack()

    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({ident: `csv`, loader: `csv-loader`}),
    )
  })
})
