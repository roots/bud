import {json5, toml, yaml} from '@roots/bud-support'
import {RuleSetRule} from 'webpack'

import {Bud, factory} from '../../util/bud'

describe('bud.build.config', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
    await bud.build.make()
  })

  it(`doesn't include deprecated properties`, () => {
    expect(bud.build.config.hasOwnProperty('devServer')).toBe(
      false,
    )
    expect(bud.build.config.hasOwnProperty('unsafeCache')).toBe(
      false,
    )
  })

  it('has expected bail default', () => {
    expect(bud.build.config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    expect(bud.build.config.cache).toMatchSnapshot({
      type: 'filesystem',
      buildDependencies: {
        bud: expect.any(Array),
      },
      cacheDirectory: expect.stringContaining('.budfiles'),
      managedPaths: expect.any(Array),
      version: expect.any(String),
    })
  })

  it('has expected context default', () => {
    expect(bud.build.config.context).toEqual(bud.path('project'))
  })

  it('has expected devtool default', () => {
    expect(bud.build.config.devtool).toBe(false)
  })

  it('has expected entry default', () => {
    expect(bud.build.config.entry).toBeUndefined()
  })

  it('has expected infrastructureLogging default', () => {
    expect(bud.build.config.infrastructureLogging).toEqual({
      console: false,
    })
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
    expect(
      (bud.build.config.optimization as any).emitOnErrors,
    ).toEqual(false)
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(bud.build.config.optimization.runtimeChunk).toEqual(
      false,
    )
  })

  it('has expected profile default', () => {
    expect(bud.build.config.profile).toEqual(undefined)
  })

  it('has expected resolve.alias default', () => {
    expect(bud.build.config.resolve.alias).toEqual({})
  })

  it('has expected resolve.extensions default', () => {
    expect(bud.build.config.resolve.extensions).toMatchSnapshot([
      '.wasm',
      '.mjs',
      '.js',
      '.jsx',
      '.css',
      '.json',
      '.json5',
      '.toml',
      '.xml',
      '.csv',
      '.yml',
      '.yaml',
      '.xml',
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

  it('has expected number of plugins', () => {
    expect(bud.build.config.plugins.length).toMatchSnapshot()
  })

  it('has valid plugins', () => {
    bud.build.config.plugins.filter(plugin => {
      expect(plugin).toHaveProperty('apply')
    })
  })

  it('has expected default requireEnsure rule', () => {
    expect(bud.build.config.module.rules[0]).toMatchSnapshot({
      test: /\.[cm]?(jsx?|tsx?)$/,
      parser: {requireEnsure: false},
    })
  })

  it('has expected default js rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[0],
    ).toMatchSnapshot({
      test: /\.(js|jsx)/,
      include: expect.stringContaining('src'),
      use: [
        {
          loader: expect.any(String),
          options: expect.any(Object),
        },
      ],
    })
  })

  it('has expected default css rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[1],
    ).toMatchSnapshot({
      test: /\.css$/,
      include: expect.stringContaining('src'),
      use: [
        {
          loader: expect.stringContaining(
            'mini-css-extract-plugin/dist/loader.js',
          ),
        },
        {
          loader: expect.stringContaining(
            'css-loader/dist/cjs.js',
          ),
          options: {
            importLoaders: 1,
            sourceMap: false,
          },
        },
        {
          loader: expect.stringContaining(
            'postcss-loader/dist/cjs.js',
          ),
          options: {
            postcssOptions: expect.any(Object),
          },
        },
      ],
    })
  })

  it('has expected default cssModule rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[2],
    ).toMatchSnapshot({
      test: /\.module.css$/,
      include: expect.stringContaining('src'),
      use: [
        {
          loader: expect.stringContaining(
            'mini-css-extract-plugin/dist/loader.js',
          ),
        },
        {
          loader: expect.stringContaining(
            'css-loader/dist/cjs.js',
          ),
          options: {
            importLoaders: 1,
            modules: true,
            sourceMap: false,
          },
        },
      ],
    })
  })

  it('has expected default image rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[3],
    ).toMatchSnapshot({
      exclude: /(node_modules|bower_components)/,
      generator: {
        filename: 'images/[name][ext]',
      },
      test: /\.(png|jpe?g|gif)$/,
      type: 'asset/resource',
    })
  })

  it('has expected default svg rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[4],
    ).toMatchSnapshot({
      test: /\.svg$/,
      type: 'asset/resource',
      generator: {
        filename: 'svg/[name][ext]',
      },
    })
  })

  it('has expected default font rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[5],
    ).toMatchSnapshot({
      type: 'asset',
      generator: {filename: 'fonts/[name][ext]'},
      parser: {
        dataUrlCondition: {
          maxSize: 50000,
        },
      },
    })
  })

  it('has expected default json rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[6],
    ).toMatchSnapshot({
      parser: {parse: json5.parse},
      test: /\.json5$/,
      type: 'json',
    })
  })

  it('has expected default yaml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[7],
    ).toMatchSnapshot({
      parser: {parse: yaml.parse},
      test: /\.ya?ml$/,
      type: 'json',
    })
  })

  it('has expected default html rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[8],
    ).toMatchSnapshot({
      test: /\.(html?)$/,
      use: [
        {
          loader: expect.stringContaining(
            'html-loader/dist/cjs.js',
          ),
        },
      ],
    })
  })

  it('has expected default csv rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule).oneOf[9],
    ).toMatchSnapshot({
      test: /\.(csv|tsv)$/,
      use: [
        {
          loader: expect.stringContaining('csv-loader/index.js'),
        },
      ],
    })
  })

  it('has expected default xml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule)
        .oneOf[10],
    ).toMatchSnapshot({
      test: /\.xml$/,
      use: [
        {
          loader: expect.stringContaining(
            '/xml-loader/index.js',
          ),
        },
      ],
    })
  })

  it('has expected default toml rule', () => {
    expect(
      (bud.build.config.module.rules[1] as RuleSetRule)
        .oneOf[11],
    ).toMatchSnapshot({
      parser: {
        parse: toml.parse,
      },
      test: /\.toml$/,
      type: 'json',
    })
  })
})
