import {Bud, factory} from '@repo/test-kit/bud'
import {seed} from '@roots/bud'
import {RuleSetRule} from 'webpack'

describe('bud.build.config', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it(`doesn't include deprecated properties`, () => {
    expect(bud.build.config.hasOwnProperty('devServer')).toBe(false)
    expect(bud.build.config.hasOwnProperty('unsafeCache')).toBe(false)
  })

  it('has expected bail default', () => {
    expect(bud.build.config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    const cache: any = bud.build.config.cache

    expect(cache.type).toStrictEqual('filesystem')

    expect(cache.buildDependencies.bud).toEqual([
      expect.stringContaining('package.json'),
      expect.stringContaining('.eslintrc.js'),
      expect.stringContaining('bud.config.cjs'),
      expect.stringContaining('docker-compose.yml'),
      expect.stringContaining('tailwind.config.js'),
      expect.stringContaining('tsconfig.json'),
    ])

    expect(cache.cacheDirectory).toStrictEqual(
      expect.stringContaining('.budfiles/cache/webpack'),
    )

    expect(cache.managedPaths).toStrictEqual([
      expect.stringContaining('node_modules'),
    ])

    expect(cache.version).toStrictEqual(expect.any(String))
  })

  it('has expected context default', () => {
    expect(bud.build.config.context).toEqual(bud.path())
  })

  it('has expected devtool default', () => {
    expect(bud.build.config.devtool).toBe(undefined)
  })

  it('has expected entry default', () => {
    expect(bud.build.config.entry).toBeUndefined()
  })

  it('has expected infrastructureLogging default', () => {
    expect(
      JSON.stringify(bud.build.config.infrastructureLogging.console),
    ).toStrictEqual(
      JSON.stringify(seed['build.infrastructureLogging.console'].pop()()),
    )
  })

  it('has expected mode default', () => {
    expect(bud.build.config.mode).toEqual('production')
  })

  it('has expected name default', () => {
    expect(bud.build.config.name).toEqual('bud')
  })

  it('has expected node default', () => {
    expect(bud.build.config.node).toEqual(false)
  })

  it('has expected optimization.minimize default', () => {
    expect(bud.build.config.optimization.minimize).toEqual(false)
  })

  it('has expected optimization.emitOnErrors default', () => {
    expect((bud.build.config.optimization as any).emitOnErrors).toEqual(
      false,
    )
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(bud.build.config.optimization.runtimeChunk).toBeUndefined()
  })

  it('has expected profile default', () => {
    expect(bud.build.config.profile).toBeUndefined()
  })

  it('has expected resolve.alias default', () => {
    expect(bud.build.config.resolve.alias).toEqual({
      '@dist': bud.path('@dist'),
      '@src': bud.path('@src'),
    })
  })

  it('has expected resolve.extensions default', () => {
    expect(bud.build.config.resolve.extensions).toMatchSnapshot([
      `.mjs`,
      `.cjs`,
      `.js`,
      `.jsx`,
      `.css`,
      `.json`,
      `.wasm`,
      `.yml`,
      `.toml`,
    ])
  })

  it('has expected target default', () => {
    expect(bud.build.config.target).toMatch(/browserslist.*/)
  })

  it('has expected watch default', () => {
    expect(bud.build.config.watch).toBeUndefined()
  })

  it('has expected watchOptions default', () => {
    expect(bud.build.config.watchOptions).toBeUndefined()
  })

  it('has expected plugins', () => {
    const plugins = bud.build.config.plugins.map(
      plugin => plugin.constructor.name,
    )
    expect(plugins).toContain('EntrypointsWebpackPlugin')
    expect(plugins).toContain('WebpackManifestPlugin')
    expect(plugins).toContain('ESLintWebpackPlugin')
    expect(plugins).toContain('DefinePlugin')
    expect(plugins).toContain('MiniCssExtractPlugin')
  })

  it('has expected default requireEnsure rule', () => {
    expect(bud.build.config.module.rules[0]).toMatchSnapshot()
  })

  it('has expected default js rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[0],
    ).toMatchSnapshot()
  })

  it('has expected default css rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[1],
    ).toMatchSnapshot()
  })

  it('has expected default cssModule rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[2],
    ).toMatchSnapshot()
  })

  it('has expected default image rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[3],
    ).toMatchSnapshot()
  })

  it('has expected default webp rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[4],
    ).toMatchSnapshot()
  })

  it('has expected default svg rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[5],
    ).toMatchSnapshot()
  })

  it('has expected default font rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[6],
    ).toMatchSnapshot()
  })

  it('has expected default json rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[7],
    ).toMatchSnapshot()
  })

  it('has expected default yaml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[8],
    ).toMatchSnapshot()
  })

  it('has expected default html rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[9],
    ).toMatchSnapshot()
  })

  it('has expected default csv rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[10],
    ).toMatchSnapshot()
  })

  it('has expected default xml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[11],
    ).toMatchSnapshot()
  })

  it('has expected default toml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[12],
    ).toMatchSnapshot()
  })
})
