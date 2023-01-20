import path from 'node:path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import {beforeEach, expect, describe, it} from 'vitest'
import BladeWebpackPlugin from '../lib/plugin';

describe('@roots/blade-loader', () => {
  let compiler
  let modules
  let assets
  let errors
  let entrypoints

  beforeEach(async () => {
    compiler = webpack({
      context: __dirname,
      entry: [`./index.js`],
      output: {
        path: path.resolve(__dirname),
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            type: 'asset/resource',
          },
        ],
      },
      plugins: [
        new BladeWebpackPlugin()
      ],
      resolve: {
        modules: [__dirname],
      }
    });

    compiler.outputFileSystem = createFsFromVolume(new Volume());
    compiler.outputFileSystem.join = path.join.bind(path);

    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) reject(err);
        modules = stats?.toJson({assets: true});
        entrypoints = stats?.toJson().entrypoints
        assets = stats?.toJson().assets
        return resolve(modules)
      });
    });
  })

  it('does not error', () => {
    expect(errors).toBe(undefined)
  })

  it('works good', ()  => {
    expect(Object.values(entrypoints)[0]).toEqual(expect.objectContaining({
      assets: [expect.objectContaining({
        name: `main.js`,
        size: 0,
      })],
    }))
    expect(modules.assets[0].info.sourceFilename).toStrictEqual(`loader-test.jpg`);
  });
});
