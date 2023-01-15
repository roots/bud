import path from 'node:path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
import {beforeEach, expect, describe, it} from 'vitest'

describe('@roots/blade-loader', () => {
  let compiler
  let source
  let errors

  beforeEach(async () => {
    compiler = webpack({
      context: __dirname,
      entry: `./index.blade.php`,
      output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.jpg$/,
            type: 'asset/resource',
          },
          {
            test: /\.blade\.php$/,
            use: [{
              loader: 'file-loader',
            }, {
              loader: path.resolve(__dirname, '../lib/index.cjs'),
            }]
          },
        ],
      },
      resolve: {
        modules: [__dirname],
      }
    });

    compiler.outputFileSystem = createFsFromVolume(new Volume());
    compiler.outputFileSystem.join = path.join.bind(path);

    await new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) reject(err);
        source = stats.toJson({source: true}).modules[0];
        return resolve(source)
      });
    });
  })

  it('does not error', async () => {
    expect(errors).toBe(undefined)
  })

  it('works good', async ()  => {
    expect(source.assets[0]).toStrictEqual(expect.stringMatching(/\.jpg$/));
    expect(source.assets[1]).toStrictEqual(expect.stringMatching(/\.php$/))
  });
});
