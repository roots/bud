/**
 * Dev server
 */
const devServer = ({options}) => {
  if (options.inProduction) {
    return
  }

  return {
    devServer: {
      ...options.dev,
    },
  }
}

module.exports = devServer
