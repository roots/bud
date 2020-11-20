import {Configuration} from 'webpack'

export const namedModules: Configuration['optimization']['namedModules'] = true

export const noEmitOnErrors: Configuration['optimization']['noEmitOnErrors'] = true

export const runtimeChunk: Configuration['optimization']['runtimeChunk'] = {
  name: (entrypoint: any): string =>
    `runtime/${entrypoint.name}`,
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
      test: /[\\/]node_modules[\\/]/,
      name,
      chunks: 'async',
    },
  },
}

function name(
  chunks: {name: string}[],
  cacheGroupKey: string,
): string {
  return chunks?.length && chunks.length > 0
    ? `${cacheGroupKey}/${chunks}`
    : `${cacheGroupKey}/${chunks
        .map(item => item.name)
        .join('~')}`
}
