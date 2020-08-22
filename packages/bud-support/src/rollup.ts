import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from 'rollup-plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'

/* eslint-disable */
const banner = (pkg: any): string => `/**
 * ${pkg.name} v.${pkg.version} {@link ${pkg.homepage}}
 *
 * ${pkg.description}
 *
 * Issues? {@link ${pkg.bugs.url}}
 *
 * Consider funding our work 🙏🏽 {@link ${pkg.funding.url}}
 *
 * @copyright ${new Date().getFullYear()} Roots {@link https://roots.io}
 * @license ${pkg.license}
 */`
/* eslint-enable */

const output = (directory: string, pkg: any): any[] => [
  {
    banner: banner(pkg),
    file: pkg.main,
    format: 'cjs',
    plugins: [terser()],
  },
  {
    banner: banner(pkg),
    file: path.join(directory, pkg.main.replace('.min', '')),
    format: 'cjs',
  },
  {
    banner: banner(pkg),
    dir: path.join(directory, './lib/es/'),
    format: 'es',
    esModule: true,
    preserveModules: true,
    assetFileNames: true,
  },
]

const rollup = (directory: string, pkg: any): any => ({
  input: 'src/index.ts',
  output: output(directory, pkg),
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
    'path',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    nodeResolve({
      browser: false,
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
  ],
})

export default rollup
