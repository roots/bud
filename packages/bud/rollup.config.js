import typescript from 'rollup-plugin-typescript2'
import jsx from 'rollup-plugin-jsx'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import {terser} from 'rollup-plugin-terser'

const banner = `/**
 * @roots/bud v${pkg.version}
 * A webpack helper framework <https://github.com/roots/bud>
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
      file: './dist/bud.js',
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
    babel({
      babelHelpers: 'bundled',
    }),
    jsx({factory: 'React.createElement'}),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
  ],
}
