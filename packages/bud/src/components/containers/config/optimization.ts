import {Configuration} from 'webpack'

export const namedModules: Configuration['optimization']['namedModules'] = true

export const noEmitOnErrors: Configuration['optimization']['noEmitOnErrors'] = true

export const runtimeChunk: Configuration['optimization']['runtimeChunk'] = {
  name: entrypoint => `runtime/${entrypoint.name}`,
}

export const splitChunks: Configuration['optimization']['splitChunks'] = {
  chunks: 'async',
  minSize: 20000,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 30,
  maxInitialRequests: 30,
  cacheGroups: {
    vendor: {
      enforce: true,
      priority: -10,
      test: /[\\/]node_modules[\\/]/,
      chunks: 'all',
      name(module, _chunks, cacheGroupKey) {
        const moduleFileNameParts = module
          .identifier()
          .split('/')
          .reduceRight(item => item)
          .split('.')

        const file = moduleFileNameParts
          .slice(0, moduleFileNameParts.length - 1)
          .join('.')

        return `${cacheGroupKey}/${file}`
      },
      reuseExistingChunk: true,
    },
  },
}
