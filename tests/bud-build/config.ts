import {Framework, setupBud, teardownBud} from '../util'
import {Build} from '@roots/bud-build'
import RemarkHTML from 'remark-html'
import toml from 'toml'
import yaml from 'yamljs'
import json5 from 'json5'

describe('bud.build.config', function () {
  let bud: Framework,
    config: Build['config'],
    path: Framework['path']

  beforeAll(() => {
    bud = setupBud()
    config = bud.build.config
    path = bud.path
  })

  afterAll(() => {
    teardownBud(bud)
  })

  it(`doesn't include deprecated properties`, () => {
    expect(config.hasOwnProperty('devServer')).toBe(false)
    expect(config.hasOwnProperty('unsafeCache')).toBe(false)
  })

  it('has expected bail default', () => {
    expect(config.bail).toEqual(true)
  })

  it('has expected cache default', () => {
    expect(config.cache).toEqual({
      type: 'memory',
    })
  })

  it('has expected context default', () => {
    expect(config.context).toEqual(path('project'))
  })

  it('has expected devtool default', () => {
    expect(config.devtool).toEqual(false)
  })

  it('has expected entry default', () => {
    expect(config.entry).toEqual(undefined)
  })

  it('has expected experiments default', () => {
    expect(config.experiments).toEqual({
      lazyCompilation: false,
    })
  })

  it('has expected infrastructureLogging default', () => {
    expect(config.infrastructureLogging).toEqual({})
  })

  it('has expected mode default', () => {
    expect(config.mode).toEqual('production')
  })

  it('has expected name default', () => {
    expect(config.name).toEqual('bud')
  })

  it('has expected node default', () => {
    expect(config.node).toEqual(false)
  })

  it('has expected optimization.minimize default', () => {
    expect(config.optimization.minimize).toEqual(true)
  })

  it('has expected optimization.emitOnErrors default', () => {
    expect(config.optimization.emitOnErrors).toEqual(false)
  })

  it('has expected optimization.runtimeChunk default', () => {
    expect(config.optimization.runtimeChunk).toEqual(undefined)
  })

  it('has expected profile default', () => {
    expect(config.profile).toEqual(true)
  })

  it('has expected resolve.alias default', () => {
    expect(config.resolve.alias).toEqual({})
  })

  it('has expected resolve.extensions default', () => {
    expect(config.resolve.extensions).toEqual([
      '.wasm',
      '.mjs',
      '.js',
      '.css',
      '.json',
    ])
  })

  it('has expected resolve.modules default', () => {
    expect(config.resolve.modules).toEqual([
      'src',
      'node_modules',
    ])
  })

  it('has expected stats default', () => {
    expect(config.stats).toEqual({})
  })

  it('has expected target default', () => {
    expect(config.target).toEqual('web')
  })

  it('has expected watch default', () => {
    expect(config.watch).toEqual(false)
  })

  it('has expected watchOptions default', () => {
    expect(config.watchOptions).toEqual(undefined)
  })

  it('has expected number of plugins', () => {
    expect(config.plugins.length).toBe(4)
  })

  it('has valid plugins', () => {
    config.plugins.filter(plugin => {
      expect(plugin).toHaveProperty('apply')
    })
  })

  it('has expected module.rules default', () => {
    expect(config.module).toEqual({
      rules: [
        {
          oneOf: [
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.css$/,
              use: [
                {
                  loader: path(
                    'project',
                    '/node_modules/mini-css-extract-plugin/dist/loader.js',
                  ),
                  options: {
                    publicPath: '.',
                  },
                },
                {
                  loader: path(
                    'project',
                    'node_modules/css-loader/dist/cjs.js',
                  ),
                  options: {
                    importLoaders: 1,
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(js|jsx)$/,
              use: [],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(png|jpe?g|gif)$/,
              type: 'asset/resource',
              generator: {
                filename: 'assets/[hash][ext][query]',
              },
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.(ttf|otf|eot|woff2?|ico)$/,
              use: [
                {
                  loader: path(
                    'project',
                    'node_modules/resolve-url-loader/index.js',
                  ),
                  options: {
                    root: path('project', 'src'),
                    sourceMap: false,
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.md$/,
              use: [
                {
                  loader: path(
                    'project',
                    'node_modules/html-loader/dist/cjs.js',
                  ),
                },
                {
                  loader: path(
                    'project',
                    'node_modules/remark-loader/dist/cjs.js',
                  ),
                  options: {
                    remarkOptions: {
                      plugins: [RemarkHTML],
                    },
                  },
                },
              ],
            },
            {
              exclude: /(node_modules|bower_components)/,
              test: /\.svg$/,
              type: 'asset/resource',
              generator: {
                filename: 'assets/[hash][ext][query]',
              },
            },
            {
              test: /\.(html?)$/,
              use: [
                {
                  loader: path(
                    'project',
                    'node_modules/html-loader/dist/cjs.js',
                  ),
                },
              ],
            },
            {
              test: /\.(csv|tsv)$/i,
              use: [
                {
                  loader: path(
                    'project',
                    'node_modules/csv-loader/index.js',
                  ),
                },
              ],
            },
            {
              test: /\.xml$/i,
              use: [
                {
                  loader: path(
                    'project',
                    'node_modules/xml-loader/index.js',
                  ),
                },
              ],
            },
            {
              parser: {
                parse: toml.parse,
              },
              test: /\.toml$/i,
              type: 'json',
            },
            {
              parser: {
                parse: yaml.parse,
              },
              test: /\.yaml$/i,
              type: 'json',
            },
            {
              parser: {
                parse: json5.parse,
              },
              test: /\.json5$/i,
              type: 'json',
            },
          ],
          parser: {requireEnsure: false},
        },
      ],
    })
  })

  it('config accessor produces obj with expected keys', () => {
    expect(Object.keys(bud.build.config)).toEqual([
      'bail',
      'cache',
      'context',
      'devtool',
      'entry',
      'experiments',
      'externals',
      'infrastructureLogging',
      'mode',
      'module',
      'name',
      'node',
      'output',
      'optimization',
      'parallelism',
      'performance',
      'plugins',
      'profile',
      'recordsPath',
      'resolve',
      'stats',
      'target',
      'watch',
      'watchOptions',
    ])
  })
})
