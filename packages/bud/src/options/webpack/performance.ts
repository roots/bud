import {Configuration} from 'webpack'

const performance: Configuration['performance'] = {
  assetFilter: undefined,
  hints: false,
  maxAssetSize: 250000,
  maxEntrypointSize: 250000,
}

export {performance as default}
