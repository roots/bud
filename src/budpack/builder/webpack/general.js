/**
 * General webpackery.
 */
const general = ({paths, mode, features, options}) => ({
  context: paths.project,
  devtool: features.sourceMap ? options.devtool : false,
  mode,
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
  target: options.target,
  watch: features.watch,
})

export {general}
