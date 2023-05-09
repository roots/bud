// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: {
    [`index`]: `./sources/@roots/filesystem/src/index.ts`,
    [`s3/index`]: `./sources/@roots/filesystem/src/s3/index.ts`,
    [`s3/client`]: `./sources/@roots/filesystem/src/s3/client.ts`,
    [`s3/config`]: `./sources/@roots/filesystem/src/s3/config.ts`,
    [`filesystem`]: `./sources/@roots/filesystem/src/filesystem.ts`,
    [`json`]: `./sources/@roots/filesystem/src/json.ts`,
    [`yml`]: `./sources/@roots/filesystem/src/yml.ts`,
  },
  output: {
    dir: `./sources/@roots/filesystem/lib`,
    format: `es`,
    sourcemap: true,
  },
  plugins: [
    typescript({
      tsconfig: `./sources/@roots/filesystem/tsconfig.json`,
      outputToFilesystem: true,
    }),
    commonjs(),
    json(),
    resolve({
      preferBuiltins: true,
      modulePaths: [`node_modules`],
    }),
  ],
}
