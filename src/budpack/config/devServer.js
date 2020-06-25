/**
 * Dev server
 */
const devServer = ({options}) => ({
  devServer: {
    ...options.dev,
  },
})

module.exports = devServer
