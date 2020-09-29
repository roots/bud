import {Configuration} from 'webpack'

const optimization: Configuration['optimization'] = {
  runtimeChunk: {
    name: (entrypoint: any): string =>
      `runtime/${entrypoint.name}`,
  },
  splitChunks: {
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
        name: (
          chunks: {name}[],
          cacheGroupKey: string,
        ): string =>
          `${cacheGroupKey}/${chunks
            .map(item => item.name)
            .join('~')}`,
        chunks: 'all',
      },
    },
  },
}

export {optimization as default}
