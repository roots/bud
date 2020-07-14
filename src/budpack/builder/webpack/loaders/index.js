import styleLoaders from './styleLoaders'

const loaderModules = {
  babel: require.resolve('babel-loader'),
  eslint: require.resolve('eslint-loader'),
  file: require.resolve('file-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
}

/**
 * Babel loader
 */
const babel = ({babel}, paths) => ({
  test: /\.js$/,
  include: paths.src,
  exclude: /node_modules/,
  loader: loaderModules.babel,
  options: babel,
})

/**
 * Eslint loader
 */
const eslint = ({eslint}, paths) => ({
  enforce: 'pre',
  test: /\.js$/,
  include: paths.src,
  exclude: /node_modules/,
  loader: loaderModules.eslint,
  options: {
    configFile: eslint.config,
    formatter: 'codeframe',
    failOnError: true,
  },
})

/**
 * Static loader
 */
const images = () => ({
  test: /\.jpe?g$|\.gif$|\.png$/i,
  use: [
    {
      loader: loaderModules.file,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
})

/**
 * SVG loader
 */
const svg = ({svg}) => ({
  test: /\.svg$/,
  use: svg.use,
})

/**
 * Webpack loaders
 */
const loaders = ({features, options, configs, paths}) => ({
  module: {
    strictExportPresence: true,
    rules: [
      ...(configs.eslint ? [eslint(configs, paths)] : []),
      ...(features.babel && options.babel
        ? [babel(options, paths)]
        : []),
      ...styleLoaders(options, features, paths),
      images(),
      svg(options),
    ],
  },
})

export {loaders}
