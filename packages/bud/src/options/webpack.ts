import {Configuration} from 'webpack'

const webpack: Configuration = {
  entry: {},
  externals: {},
  resolve: {
    extensions: [
      '.wasm',
      '.mjs',
      '.js',
      '.json',
      '.css',
    ],
  },
  devtool: 'source-map',
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
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
  },
  stats: 'none',
  target: 'web',
}

export {webpack as default}
