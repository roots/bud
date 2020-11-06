import {Configuration} from 'webpack'

export const alias: Configuration['resolve']['alias'] = {}

export const extensions: Configuration['resolve']['extensions'] = [
  '.wasm',
  '.mjs',
  '.js',
  '.json',
  '.css',
]
