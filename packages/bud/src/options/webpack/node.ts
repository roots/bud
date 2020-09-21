import {Configuration} from 'webpack'

const node: Configuration['node'] = {
  module: 'empty',
  dgram: 'empty',
  dns: 'mock',
  fs: 'empty',
  http2: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty',
}

export {node as default}
