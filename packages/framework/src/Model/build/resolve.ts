import {Configuration} from 'webpack'

const resolve: Configuration['resolve'] = {
  alias: {},
  extensions: ['.wasm', '.mjs', '.js', '.json', '.css'],
}

export {resolve as default}
