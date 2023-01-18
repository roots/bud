import {describe, expect, it} from 'vitest'

import {xml} from './xml'

describe(`xml loader`, () => {
  it(`should return a rule`, async () => {
    const bud = await import(`@repo/test-kit/bud`).then(
      async ({factory}) => await factory(),
    )
    const result = xml({
      filter: bud.hooks.filter,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      isProduction: bud.isProduction,
      path: bud.path,
    })

    const webpackOutput = result.toWebpack()
    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({
        ident: `xml`,
        loader: `@roots/bud-support/xml-loader`,
      }),
    )
  })
})
