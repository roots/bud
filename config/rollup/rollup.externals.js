// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: {
    [`figures/index`]: `./node_modules/figures`,
    [`fs-extra/index`]: `./node_modules/fs-extra`,
    [`fs-jetpack/index`]: `./node_modules/fs-jetpack`,
  },
  output: {
    dir: `./sources/@roots/bud-support/lib`,
    format: `es`,
  },
  plugins: [
    commonjs(),
    json(),
    resolve({
      preferBuiltins: true,
      modulePaths: [`node_modules`],
    }),
    terser(),
  ],
}
