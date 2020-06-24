import chokidar from 'chokidar'

/**
 * Dev server
 */
const devServer = ({options}) => ({
  devServer: {
    before(app, server) {
      chokidar
        .watch([
          `${options.project}/**/*.php`,
          `${options.project}/**/*.js`,
          `${options.project}/**/*.css`,
        ])
        .on('all', () => {
          server.sockWrite(
            server.sockets,
            'content-changed',
          )
        })
    },
    ...options.dev,
  },
})

module.exports = devServer
