import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

const banner = `/**
* @roots/bud-dependency-extraction v${pkg.version}
*
* Adds @wordpress/dependency-extraction-webpack-plugin support
* to the @roots/bud framework <https://github.com/roots/bud>
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
      file: './dist/bud-dependency-extraction.js',
      format: 'cjs',
    },
  ],
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
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
  ],
}
