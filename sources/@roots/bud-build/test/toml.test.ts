import {type Bud, factory} from '@repo/test-kit'
import toml from '@roots/bud-build/rules/toml'
import {describe, expect, it} from 'vitest'

describe(`toml loader`, () => {
  let bud: Bud

  it(`should return a rule`, async () => {
    bud = await factory()
    const result = await toml({
      filter: bud.hooks.filter,
      isProduction: bud.isProduction,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      path: bud.path,
      resolve: bud.module.resolve,
    })
    const webpackOutput = result.toWebpack()
    expect(webpackOutput.type).toEqual(`json`)
  })
})
