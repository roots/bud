/**
 * General webpack options
 *
 * @typedef {function (options: object) => {object}} general
 * @param {bud}    bud
 * @param {object} bud.paths
 * @param {string} bud.mode
 * @param {object} bud.features
 * @param {object} bud.options
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
