/**
 * Webpack resolvers.
 *
 * @param {object}
 */
const webpackResolve = bud => ({
  bud,
  options: {
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
      alias: bud.stateoptions.alias || {},
    },
  },

  make: function () {
    return this.options
  },
})

export {webpackResolve}
