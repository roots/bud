const loaders = {
  eslint: require.resolve('eslint-loader'),
}

/**
 * Eslint loader
 */
const eslint = ({eslint}, paths) => ({
  enforce: 'pre',
  test: /\.js$/,
  include: paths.src,
  exclude: /node_modules/,
  loader: loaders.eslint,
  options: {
    configFile: eslint,
    formatter: 'codeframe',
    failOnError: true,
  },
})

export {eslint}
