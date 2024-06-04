import {path} from '@repo/constants'
import {createFsFromVolume, Volume} from 'memfs'
import {beforeAll, describe, expect, it, vi} from 'vitest'
import webpack, {type Compiler, type StatsCompilation} from 'webpack'

const fixturePath = path(
  `sources`,
  `@roots`,
  `blade-loader`,
  `test`,
  `__fixtures__`,
)

describe(`@roots/blade-loader`, () => {
  it(`should re-export @roots/blade-loader/plugin`, async () => {
    const {name} = (await import(`../src/index.ts`)).default
    expect(name).toBe(`BladeWebpackPlugin`)
  })

  it(`should re-export @roots/blade-loader/asset-loader`, async () => {
    const {name} = (await import(`../src/index.ts`)).assetLoader
    expect(name).toBe(`loader`)
  })

  it(`should re-export @roots/blade-loader/module-loader`, async () => {
    const {name} = (await import(`../src/index.ts`)).moduleLoader
    expect(name).toBe(`loader`)
  })

  describe(`@roots/blade-loader/plugin`, async () => {
    let compiler: Compiler
    let compilationStats: StatsCompilation | undefined
    let BladeWebpackPlugin: any

    beforeAll(async () => {
      BladeWebpackPlugin = (await import(`../src/plugin/index.ts`)).default

      compiler = webpack({
        context: fixturePath,
        entry: [`./index.blade.php`],
        module: {
          rules: [
            {
              test: /\.jpg$/,
              type: `asset/resource`,
            },
            {
              test: /\.js$/,
              use: [`babel-loader`],
            },
          ],
        },
        output: {
          path: fixturePath,
        },
        plugins: [new BladeWebpackPlugin()],
        resolve: {
          modules: [path(`node_modules`)],
        },
      })

      compiler.outputFileSystem = createFsFromVolume(new Volume()) as any

      if (!compiler.outputFileSystem)
        throw new Error(`No output file system`)

      await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
          if (err) reject(err)

          compilationStats = stats?.toJson({
            assets: true,
            entrypoints: true,
            modules: true,
          })
          return resolve(null)
        })
      })
    })

    it(`should not error`, () => {
      expect(compilationStats?.errors).toStrictEqual([])
    })

    it(`should pull asset into compilation`, () => {
      if (!compilationStats) throw new Error(`No compilation stats`)
      if (!compilationStats.entrypoints)
        throw new Error(`No compilation stats entrypoints`)

      expect(Object.values(compilationStats.entrypoints).pop()).toEqual(
        expect.objectContaining({
          auxiliaryAssets: [
            expect.objectContaining({
              name: expect.stringMatching(/\.jpg$/),
              size: 761411,
            }),
          ],
        }),
      )
      expect(compilationStats?.assets).toHaveLength(2)
    })

    it(`should use module-loader when extractScripts is undefined`, async () => {
      const rules = []
      const Plugin = new BladeWebpackPlugin()

      await Plugin.apply({
        hooks: {
          afterEnvironment: {
            tap: vi.fn((name, cb) => cb()),
          },
        },
        options: {
          module: {
            rules,
          },
        },
      })
      expect(rules).toMatchInlineSnapshot(`
        [
          {
            "test": /\\\\\\.php\\$/,
            "use": [
              "@roots/blade-loader/module-loader",
              "@roots/blade-loader/asset-loader",
            ],
          },
        ]
      `)
    })

    it(`should use module-loader when extractScripts is true`, async () => {
      const rules = []
      const Plugin = new BladeWebpackPlugin({extractScripts: true})

      await Plugin.apply({
        hooks: {
          afterEnvironment: {
            tap: vi.fn((name, cb) => cb()),
          },
        },
        options: {
          module: {
            rules,
          },
        },
      })
      expect(rules).toMatchInlineSnapshot(`
        [
          {
            "test": /\\\\\\.php\\$/,
            "use": [
              "@roots/blade-loader/module-loader",
              "@roots/blade-loader/asset-loader",
            ],
          },
        ]
      `)
    })

    it(`should not use module-loader when extractScripts is false`, async () => {
      const rules = []
      const Plugin = new BladeWebpackPlugin({extractScripts: false})

      await Plugin.apply({
        hooks: {
          afterEnvironment: {
            tap: vi.fn((name, cb) => cb()),
          },
        },
        options: {
          module: {
            rules,
          },
        },
      })
      expect(rules).toMatchInlineSnapshot(`
        [
          {
            "test": /\\\\\\.php\\$/,
            "use": [
              "@roots/blade-loader/asset-loader",
            ],
          },
        ]
      `)
    })
  })
})
