import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'sources/index.js',
    output: {
      name: 'plugin-tasks',
      file: 'lib/yarn-plugin-tasks.cjs',
      format: 'cjs',
    },
    plugins: [
      resolve({preferBuiltins: true}),
      commonjs(),
      json(),
    ],
  },
]
