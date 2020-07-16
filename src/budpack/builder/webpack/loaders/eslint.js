const loaders = {
  eslint: require.resolve('eslint-loader'),
}

/**
 * Compile
 * @typedef {function} compile
 */
const compile = function () {
  return this.bud.configs.eslint
    ? {
        enforce: 'pre',
        test: /\.js$/,
        include: this.bud.paths.src,
        exclude: /node_modules/,
        loader: loaders.eslint,
        options: {
          configFile: this.bud.configs.eslint,
          formatter: 'codeframe',
          failOnError: true,
        },
      }
    : {}
}

/**
 * Eslint loader
 */
const eslint = bud => ({
  bud,
  compile,
})

export {eslint}
