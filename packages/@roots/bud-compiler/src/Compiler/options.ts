/**
 * Stats common
 */
const commonStats = {
  all: false,
  version: true,
  hash: true,
  timings: true,
  builtAt: false,
  assets: true,
  chunks: false,
  children: false,
  errors: true,
  entrypoints: true,
}

/**
 * Stats options.
 */
const options = {
  json: {
    ...commonStats,
    cachedAssets: true,
  },
  string: {
    ...commonStats,
    colors: true,
  },
}

export default options
