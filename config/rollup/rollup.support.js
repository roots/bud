// @ts-check
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import esInterop from 'rollup-plugin-es-module-interop'
import externals from 'rollup-plugin-node-externals'

export default {
  input: {
    [`ink/index`]: `sources/@roots/bud-support/src/ink/index.tsx`,
    [`highlight/index`]: `sources/@roots/bud-support/src/highlight/index.ts`,
    [`logger/index`]: `sources/@roots/bud-support/src/logger/index.ts`,
  },
  output: {
    dir: `./sources/@roots/bud-support/lib`,
    format: `es`,
  },
  plugins: [
    typescript({
      allowSyntheticDefaultImports: true,
      jsx: `react`,
      target: `esnext`,
      module: `esnext`,
      include: [
        `sources/@roots/bud-support/**/*`,
        `node_modules`,
      ],
    }),
    commonjs(),
    json(),
    esInterop(),
    externals({
      deps: false,
      devDeps: false,
      peerDeps: false,
      include: [
        `chalk`,
        `@roots/bud-support`,
        `lodash`,
        `slice-ansi`,
        `webpack`,
        `wrap-ansi`,
        `yoga-layout-prebuilt`,
      ],
    }),
    resolve({
      preferBuiltins: true,
      modulePaths: [`node_modules`],
    }),
  ],
}
