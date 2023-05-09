// @ts-check
import {join} from 'node:path/posix'

import {paths} from '@repo/constants'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: {
    [`index`]: `./sources/@roots/filesystem/lib/index.js`,
    [`s3/index`]: `./sources/@roots/filesystem/lib/s3/index.js`,
    [`s3/client`]: `./sources/@roots/filesystem/lib/s3/client.js`,
    [`s3/config`]: `./sources/@roots/filesystem/lib/s3/config.js`,
    [`filesystem`]: `./sources/@roots/filesystem/lib/filesystem.js`,
    [`json`]: `./sources/@roots/filesystem/lib/json.js`,
    [`yml`]: `./sources/@roots/filesystem/lib/yml.js`,
  },
  output: {
    dir: `./sources/@roots/filesystem/lib`,
    format: `es`,
    sourcemap: false,
  },
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
  ],
}
