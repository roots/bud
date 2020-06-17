/**
 * Webpack resolves.
 */
const resolve = ({options, resolve}) => {
  const config = {
    resolve: {
      extensions: ['.js','.json','.jsx','.css'],
      modules: [resolve('node_modules')],
    },
  }

  if (options.alias) {
    config.resolve.alias = options.alias
  }

  return config
}

module.exports = resolve
