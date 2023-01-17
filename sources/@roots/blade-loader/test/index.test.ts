import path from 'node:path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import {beforeEach, expect, describe, it} from 'vitest'
import BladeWebpackPlugin from '../lib/plugin';

describe('@roots/blade-loader', () => {
  let compiler
  let modules
  let errors
  let chunks

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
        chunks = stats?.toJson().assetsByChunkName
        return resolve(modules)
      });
    });
  })

  it('does not error', () => {
    expect(errors).toBe(undefined)
  })

  it('works good', ()  => {
    expect(Object.values(chunks)).toHaveLength(1)
    expect(Object.values(chunks)[0]).toEqual(expect.arrayContaining([`main.js`]))
    expect(modules.assets[0].info.sourceFilename).toStrictEqual(`loader-test.jpg`);
  });
});
