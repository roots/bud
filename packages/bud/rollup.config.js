import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import {terser} from "rollup-plugin-terser"
import jsx from 'rollup-plugin-jsx'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'builtin-modules'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...builtins,
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    babel({ babelHelpers: 'bundled' }),
    jsx({factory: 'React.createElement'}),
    resolve(),
    commonjs(),
    terser(),
  ],
}

