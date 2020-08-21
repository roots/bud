import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

const banner = `/**
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
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
      file: './dist/bud-typescript.js',
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
