import path from 'path'

/**
 * Webpack resolvers.
 *
 * @param {object}
 */
const webpackResolve = ({options, paths}) => ({
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.vue',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [
      path.resolve(paths.project, 'node_modules'),
    ],
    ...(options.alias ? {alias: options.alias} : []),
  },
})

export {webpackResolve}
