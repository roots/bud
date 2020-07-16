/**
 * Webpack resolvers.
 *
 * @param {object}
 */
const webpackResolve = bud => ({
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.vue',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [bud.project('node_modules')],
    ...(bud.options.alias
      ? {alias: bud.options.alias}
      : []),
  },
})

export {webpackResolve}
