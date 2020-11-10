import {Configuration} from 'webpack'

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
      name: vendorName,
      chunks: 'async',
    },
  },
}

function vendorName(
  chunks: {name: string}[],
  cacheGroupKey: string,
): string {
  return chunks?.length && chunks.length > 0
    ? `${cacheGroupKey}/${chunks}`
    : `${cacheGroupKey}/${chunks
        .map(item => item.name)
        .join('~')}`
}
