import path from 'path'

/**
 * Webpack resolvers.
 *
 * @param {ob}
 */
const webpackResolve = ({options, paths}) => {
  const config = {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.jsx'],
      modules: [
        path.resolve(paths.project, 'node_modules'),
      ],
    },
  }

  if (options.alias) {
    config.resolve.alias = options.alias
  }

  return config
}

export {webpackResolve}
