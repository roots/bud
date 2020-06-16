import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * Babel loader
 */
const babel = ({babel, project}) => ({
  test: /\.(js|jsx)$/,
  include: project,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
  options: {
    ...babel,
  },
})

/**
 * Eslint loader
 */
const eslint = ({project, eslint}) => ({
  test: /\.(js|jsx)$/,
  include: project,
  exclude: /node_modules/,
  loader: require.resolve('eslint-loader'),
  options: {
    formatter: 'json',
    configFile: eslint.configFile,
  },
})

const post = configFile => ({
  loader: require.resolve('postcss-loader'),
  options: {
    config: {
      path: configFile,
    },
  },
})

/**
 * CSS Loader
 */
const css = ({project, postcss}) => {
  const use = [
    MiniCssExtractPlugin.loader,
    {loader: require.resolve('css-loader')},
  ]
  postcss.enabled && use.push(post(postcss.configFile))

  return {
    test: /\.css$/,
    include: project,
    use,
  }
}

/**
 * Static loader
 */
const images = () => ({
  test: /\.jpe?g$|\.gif$|\.png$/i,
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
})

/**
 * SVG loader
 */
const svg = () => ({
  test: /\.svg$/,
  use: [
    '@svgr/webpack',
    'url-loader',
  ],
})

/**
 * Webpack loaders
 */
const loaders = ({options}) => ({
  module: {
    strictExportPresence: true,
    rules: [
      (options.eslint.enabled ? eslint(options) : {}),
      babel(options),
      css(options),
      images(),
      svg(),
    ],
  },
})

export default loaders
