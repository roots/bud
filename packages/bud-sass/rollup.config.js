import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/**
 * @roots/bud-sass v${pkg.version}
 * Adds sass support to the @roots/bud framework.
 *
 * Consider funding <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */`

export default {
  input: 'src/index.ts',
  output: [
    {
      banner,
      file: pkg.main,
      format: 'cjs',
      plugins: [terser()],
    },
    {
      banner,
      file: './dist/bud-sass.js',
      format: 'cjs',
    },
  ],
  external: [
    ...Object.keys(pkg.devDependencies),
    ...Object.keys(pkg.dependencies),
    'path',
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    terser(),
  ],
}
