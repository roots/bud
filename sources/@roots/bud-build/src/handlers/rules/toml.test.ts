import {factory} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import {toml} from './toml'

describe(`toml loader`, () => {
  let bud

  it(`should return a rule`, async () => {
    bud = await factory()
    const result = await toml({
      filter: bud.hooks.filter,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      isProduction: bud.isProduction,
      path: bud.path,
      resolve: bud.module.resolve,
    })
    const webpackOutput = result.toWebpack()
    expect(webpackOutput.type).toEqual(`json`)
  })
})
