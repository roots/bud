import type {Bud} from '@repo/test-kit/bud'
import {describe, expect, it} from 'vitest'

import Build from './index.js'

const setup = async () => {
  const bud = (await import(`@repo/test-kit/bud`).then(
    async pkg => await pkg.factory({}),
  )) as Bud

  const build = new Build(() => bud)

  // @ts-ignore
  await build.register(bud)

  return {bud, build}
}

describe(`bud.build.config`, function () {
  it(`should not include deprecated properties`, async () => {
    const {build} = await setup()
    expect(build.config.hasOwnProperty(`devServer`)).toBe(false)
    expect(build.config.hasOwnProperty(`unsafeCache`)).toBe(false)
  })

  it(`should have expected bail default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.bail).toEqual(true)
  })

  it(`should have expected cache default`, async () => {
    const {build} = await setup()
    await build.make()

    const {cache}: any = build.config

    expect(cache.type).toStrictEqual(`filesystem`)

    expect(cache.buildDependencies.config).toEqual(
      expect.arrayContaining([
        expect.stringContaining(`project/.eslintrc.js`),
        expect.stringContaining(`project/bud.config.mjs`),
        expect.stringContaining(`project/docker-compose.yml`),
        expect.stringContaining(`project/package.json`),
        expect.stringContaining(`project/tailwind.config.js`),
        expect.stringContaining(`project/tsconfig.json`),
        expect.stringContaining(`project/webpack.config.mjs`),
      ]),
    )

    expect(cache.cacheDirectory).toStrictEqual(
      expect.stringContaining(`.budfiles`),
    )

    expect(cache.version).toStrictEqual(expect.any(String))
  })

  it(`should have expected context default`, async () => {
    const {bud, build} = await setup()
    await build.make()

    expect(build.config.context).toEqual(bud.path())
  })

  it(`should have expected devtool default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.devtool).toBe(false)
  })

  it(`should have expected entry default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.entry).toBeUndefined()
  })

  it(`should have expected mode default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.mode).toEqual(`production`)
  })

  it(`should have expected name default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.name).toEqual(`@tests/project`)
  })

  it(`should have expected node default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.node).toEqual(false)
  })

  it(`should have expected optimization.minimize default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.optimization?.minimize).toEqual(false)
  })

  it(`should have expected optimization.emitOnErrors default`, async () => {
    const {build} = await setup()
    await build.make()
    expect((build.config.optimization as any).emitOnErrors).toEqual(false)
  })

  it(`should have expected optimization.runtimeChunk default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.optimization?.runtimeChunk).toBeUndefined()
  })

  it(`should have expected profile default`, async () => {
    const {build} = await setup()
    await build.make()
    expect(build.config.profile).toBeUndefined()
  })

  it(`should have expected resolve.alias default`, async () => {
    const {bud, build} = await setup()
    await build.make()

    expect(build.config.resolve?.alias).toEqual({
      '@dist': bud.path(`@dist`),
      '@src': bud.path(`@src`),
    })
  })

  it(`should have expected resolve.extensions default`, async () => {
    const {build} = await setup()
    await build.make()

    expect(build.config.resolve?.extensions?.sort()).toEqual(
      expect.arrayContaining([
        `.css`,
        `.js`,
        `.json`,
        `.jsx`,
        `.mjs`,
        `.wasm`,
        `.yml`,
      ]),
    )
  })

  it(`should have expected target default`, async () => {
    const {build} = await setup()
    await build.make()

    expect(build.config.target).toMatch(/browserslist.*/)
  })

  it(`should have expected watch default`, async () => {
    const {build} = await setup()
    await build.make()

    expect(build.config.watch).toBeUndefined()
  })

  it(`should have expected watchOptions default`, async () => {
    const {build} = await setup()
    await build.make()

    expect(build.config.watchOptions).toBeUndefined()
  })

  it(`should have expected plugins`, async () => {
    const {build} = await setup()
    await build.make()

    const plugins = build.config.plugins
      ?.map(plugin => plugin.constructor.name)
      .sort()

    expect(plugins).toContain(`CleanWebpackPlugin`)
    expect(plugins).toContain(`FixStyleOnlyEntrypoints`)
  })

  it(`should have expected default requireEnsure rule`, async () => {
    const {build} = await setup()
    await build.make()

    if (!build.config.module?.rules?.length) throw new Error()
    expect(build.config.module.rules[0]).toEqual(
      expect.objectContaining({
        parser: {
          requireEnsure: false,
        },
      }),
    )
  })
})
