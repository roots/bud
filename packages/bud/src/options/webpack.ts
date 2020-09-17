import {Configuration} from 'webpack'

const webpack: Configuration = {
  entry: {},
  externals: {},
  resolve: {
    extensions: ['.css', '.js', '.json', '.svg'],
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
          name: function (
            module: any,
            chunks: any,
            cacheGroupKey: string,
          ): string {
            const fileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item)
              .replace('.js', '')
            const chunkNames = chunks
              .map(item => item.name)
              .join('~')
            return `${cacheGroupKey}/${chunkNames}`
          },
          chunks: 'all',
        },
      },
    },
  },
  stats: 'none',
  target: 'web',
}

export {webpack as default}
