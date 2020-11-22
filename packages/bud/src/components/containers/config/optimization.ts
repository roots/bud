import {Configuration} from 'webpack'

export const namedModules: Configuration['optimization']['namedModules'] = true

export const noEmitOnErrors: Configuration['optimization']['noEmitOnErrors'] = true

export const runtimeChunk: Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: any): string =>
    `${entrypoint.name}/runtime`,
}

export const splitChunks: Configuration['optimization']['splitChunks'] = {
  chunks: 'async',
  minSize: 20000,
  maxSize: 0,
  minChunks: 1,
  maxAsyncRequests: 30,
  maxInitialRequests: 30,
  automaticNameDelimiter: '~',
  cacheGroups: {
    vendor: {
      enforce: true,
      priority: -10,
      test: /[\\/]node_modules[\\/]/,
      name: (module, chunks) =>
        `${chunks
          .map(item => item.name)
          .join('~')}/vendor/${module
          .identifier()
          .split('/')
          .reduceRight(item => item.replace('.js', ''))}`,
      chunks: 'all',
    },
  },
}
