import {Configuration} from 'webpack'

export const alias: Configuration['resolve']['alias'] = {}

export const extensions: Configuration['resolve']['extensions'] = [
  '.wasm',
  '.mjs',
  '.js',
  '.json',
  '.css',
]

export const fallback: Configuration['resolve']['fallback'] = {
  setImmediate: false,
  module: false,
  dns: 'mock',
  process: false,
  Buffer: false,
  fs: false,
  http2: false,
  net: false,
  tls: false,
  child_process: false,
}
