import typescript from 'rollup-plugin-typescript2'
import jsx from 'rollup-plugin-jsx'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: [...Object.keys(pkg.dependencies), 'path'],
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
    terser(),
  ],
}
