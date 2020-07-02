const path = require('path')

/**
 * Webpack resolves.
 */
const resolve = options => {
  const config = {
    resolve: {
      extensions: ['.js', '.css', '.scss', '.sass'],
      modules: [
        path.resolve(options.project, 'node_modules'),
      ],
    },
  }

  if (options.alias) {
    config.resolve.alias = options.alias
  }

  return config
}

module.exports = resolve
