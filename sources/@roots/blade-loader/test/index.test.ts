import path from 'node:path'
import webpack from 'webpack'
import {createFsFromVolume, Volume} from 'memfs'
import {beforeEach, expect, describe, it} from 'vitest'
import BladeWebpackPlugin from '../lib/plugin'

describe('@roots/blade-loader', () => {
  let compiler
  let compilationStats

  beforeEach(async () => {
    compiler = webpack({
      context: __dirname,
      entry: [`./index.js`, `./index.blade.php`],
      output: {
        path: path.resolve(__dirname),
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            type: 'asset/resource',
          },
          {
            test: /\.js$/,
            use: [`babel-loader`],
          },
        ],
      },
      plugins: [new BladeWebpackPlugin()],
      resolve: {
        modules: [__dirname],
      },
    })

    compiler.outputFileSystem = createFsFromVolume(new Volume())
    compiler.outputFileSystem.join = path.join.bind(path)

    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) reject(err)

        compilationStats = stats?.toJson({
          assets: true,
          modules: true,
          entrypoints: true,
        })
        return resolve(null)
      })
    })
  })

  it('does not error', () => {
    expect(compilationStats.errors).toStrictEqual([])
  })

  it('works good', () => {
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
    expect(compilationStats.assets).toHaveLength(2)
  })
})
