import {Bud, factory} from '@repo/test-kit/bud'

import Build from './index.js'

describe(`bud.build.config`, function () {
  let bud: Bud
  let build: Build

  beforeAll(async () => {
    bud = await factory()
    build = new Build(
      // @ts-ignore
      bud,
    )

    await build.register()
    await build.make()
  })

  it(`should not include deprecated properties`, () => {
    expect(build.config.hasOwnProperty(`devServer`)).toBe(false)
    expect(build.config.hasOwnProperty(`unsafeCache`)).toBe(false)
  })

  it(`should have expected bail default`, () => {
    expect(build.config.bail).toEqual(true)
  })

  it(`should have expected cache default`, () => {
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

  it(`should have expected context default`, () => {
    expect(build.config.context).toEqual(bud.path())
  })

  it(`should have expected devtool default`, () => {
    expect(build.config.devtool).toBe(false)
  })

  it(`should have expected entry default`, () => {
    expect(build.config.entry).toBeUndefined()
  })

  it(`should have expected mode default`, () => {
    expect(build.config.mode).toEqual(`production`)
  })

  it(`should have expected name default`, () => {
    expect(build.config.name).toEqual(`@tests/project`)
  })

  it(`should have expected node default`, () => {
    expect(build.config.node).toEqual(false)
  })

  it(`should have expected optimization.minimize default`, () => {
    expect(build.config.optimization?.minimize).toEqual(false)
  })

  it(`should have expected optimization.emitOnErrors default`, () => {
    expect((build.config.optimization as any).emitOnErrors).toEqual(false)
  })

  it(`should have expected optimization.runtimeChunk default`, () => {
    expect(build.config.optimization?.runtimeChunk).toBeUndefined()
  })

  it(`should have expected profile default`, () => {
    expect(build.config.profile).toBeUndefined()
  })

  it(`should have expected resolve.alias default`, () => {
    expect(build.config.resolve?.alias).toEqual({
      '@dist': bud.path(`@dist`),
      '@src': bud.path(`@src`),
    })
  })

  it(`should have expected resolve.extensions default`, () => {
    expect(build.config.resolve?.extensions).toMatchSnapshot([
      `.mjs`,
      `.js`,
      `.jsx`,
      `.css`,
      `.json`,
      `.wasm`,
      `.yml`,
    ])
  })

  it(`should have expected target default`, () => {
    expect(build.config.target).toMatch(/browserslist.*/)
  })

  it(`should have expected watch default`, () => {
    expect(build.config.watch).toBeUndefined()
  })

  it(`should have expected watchOptions default`, () => {
    expect(build.config.watchOptions).toBeUndefined()
  })

  it(`should have expected plugins`, () => {
    const plugins = build.config.plugins?.map(
      plugin => plugin.constructor.name,
    )
    expect(plugins).toContain(`EntrypointsWebpackPlugin`)
    expect(plugins).toContain(`WebpackManifestPlugin`)
    expect(plugins).toContain(`ESLintWebpackPlugin`)
    expect(plugins).toContain(`DefinePlugin`)
    expect(plugins).toContain(`MiniCssExtractPlugin`)
  })

  it(`should have expected default requireEnsure rule`, () => {
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
