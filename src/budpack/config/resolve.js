/**
 * Webpack resolves.
 */
const resolve = bud => ({
  resolve: {
    alias: (bud.options.alias ? bud.options.alias : {}),
    extensions: ['.js','.json','.jsx','.css'],
    modules: [bud.resolve('node_modules')],
  },
})

module.exports = resolve
