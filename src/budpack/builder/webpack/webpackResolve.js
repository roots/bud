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
      alias: bud.options.alias || {},
    },
  },

  make: function () {
    this.preHook()
    this.postHook()

    return this.options
  },

  preHook: function () {
    this.bud.hooks.call('pre_resolve', this.options)
  },

  postHook: function () {
    this.bud.hooks.call('post_resolve', this.options)
  },
})

export {webpackResolve}
