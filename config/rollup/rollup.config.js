// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import esInterop from 'rollup-plugin-es-module-interop'
import externals from 'rollup-plugin-node-externals'

export default {
  input: {
    [`ink/index`]: `sources/@roots/bud-support/src/ink/index.tsx`,
    [`fs-jetpack/index`]: `node_modules/fs-jetpack`,
  },
  output: {
    dir: `./sources/@roots/bud-support/lib`,
    format: `es`,
  },
  plugins: [
    typescript({
      jsx: `react`,
      allowSyntheticDefaultImports: true,
      target: `esnext`,
      module: `esnext`,
      include: [
        `sources/@roots/bud-support/src/**/*`,
        `node_modules`,
        `sources/@roots/*/node_modules`,
      ],
    }),
    commonjs(),
    json(),
    esInterop(),
    externals({
      deps: false,
      devDeps: false,
      peerDeps: true,
      include: [
        `chalk`,
        `webpack`,
        `wrap-ansi`,
        `lodash`,
        `signale`,
        `slice-ansi`,
        `webpack`,
        `yoga-layout-prebuilt`,
      ],
    }),
    resolve({
      preferBuiltins: true,
      modulePaths: [`node_modules`, `sources/@roots/*/node_modules`],
    }),
    terser(),
  ],
}
