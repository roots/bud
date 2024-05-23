import {path} from '@repo/constants'
import BladeWebpackPlugin from '@roots/blade-loader'
import {createFsFromVolume, Volume} from 'memfs'
import {beforeAll, describe, expect, it} from 'vitest'
import webpack, {type Compiler, type StatsCompilation} from 'webpack'

const fixturePath = path(
  `sources`,
  `@roots`,
  `blade-loader`,
  `test`,
  `__fixtures__`,
)

describe(`@roots/blade-loader`, () => {
  let compiler: Compiler
  let compilationStats: StatsCompilation | undefined

  beforeAll(async () => {
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
})
