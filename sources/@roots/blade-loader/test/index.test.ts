import path from 'node:path'

import BladeWebpackPlugin from '@roots/blade-loader/plugin'
import {createFsFromVolume, Volume} from 'memfs'
import {beforeAll, describe, expect, it} from 'vitest'
import webpack, {type Compiler, type StatsCompilation} from 'webpack'

describe(`@roots/blade-loader`, () => {
  let compiler: Compiler
  let compilationStats: StatsCompilation | undefined

  beforeAll(async () => {
    compiler = webpack({
      context: __dirname,
      entry: [`./index.js`, `./index.blade.php`],
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
        path: path.resolve(__dirname),
      },
      plugins: [new BladeWebpackPlugin()],
      resolve: {
        modules: [__dirname],
      },
    })

    compiler.outputFileSystem = createFsFromVolume(new Volume()) as any

    if (!compiler.outputFileSystem)
      throw new Error(`No output file system`)

    compiler.outputFileSystem.join = path.join.bind(path)

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

  it(`does not error`, () => {
    expect(compilationStats?.errors).toStrictEqual([])
  })

  it(`works good`, () => {
    expect(
      // @ts-ignore
      Object.values(compilationStats.entrypoints).pop(),
    ).toEqual(
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
