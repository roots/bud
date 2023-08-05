import {dataUrl, default as inlineSvg} from '@roots/bud-build/rules/svg.inline'
import {describe, expect, it} from 'vitest'

describe(`svg-inline`, () => {
  it(`should return a rule`, async () => {
    const bud = await import(`@repo/test-kit`).then(
      async ({factory}) => await factory(),
    )
    const result = await inlineSvg({
      filter: bud.hooks.filter,
      isProduction: bud.isProduction,
      makeItem: bud.build.makeItem,
      makeLoader: bud.build.makeLoader,
      makeRule: bud.build.makeRule,
      path: bud.path,
      resolve: bud.module.resolve,
    })

    const webpackOutput = result.toWebpack()

    expect(webpackOutput.test).toEqual(bud.hooks.filter(`pattern.svg`))
    expect(webpackOutput.include).toEqual([bud.path(`@src`)])
    expect(webpackOutput.resourceQuery).toEqual(/inline/)
    expect(webpackOutput.type).toEqual(`asset/inline`)
    expect(webpackOutput.generator).toEqual(
      expect.objectContaining({dataUrl}),
    )
  })
})
