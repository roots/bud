import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import {csv} from './csv.js'

describe(`csv loader`, () => {
  it(`should return a rule`, async () => {
    const bud = await factory()

    const result = await csv({
      filter: bud.hooks.filter,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      isProduction: bud.isProduction,
      path: bud.path,
      resolve: bud.module.resolve,
    })

    const webpackOutput = result.toWebpack()

    expect(webpackOutput.use?.[0]).toEqual(
      expect.objectContaining({
        ident: `csv`,
        loader: expect.stringContaining(
          `@roots/bud-support/lib/csv-loader`,
        ),
      }),
    )
  })
})
