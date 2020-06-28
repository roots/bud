import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * Babel loader
 */
const babel = ({src}) => ({
  test: /\.(js|jsx)$/,
  include: src,
  exclude: /node_modules/,
  loader: require.resolve('babel-loader'),
})

/**
 * Eslint loader
 */
const eslint = ({src, eslint}) => ({
  test: /\.(js|jsx)$/,
  include: src,
  exclude: /node_modules/,
  loader: require.resolve('eslint-loader'),
  options: {
    configFile: eslint.configFile,
    format: 'codeframe',
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
const css = ({src, postcss}) => ({
  test: /\.css$/,
  include: src,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: require.resolve('css-loader')},
    ...(postcss.enabled ? [post(postcss.configFile)] : []),
    {loader: 'sass-loader'},
  ],
})

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
const svg = ({svg}) => ({
  test: /\.svg$/,
  use: svg.use,
})

/**
 * Webpack loaders
 */
const loaders = ({options}) => {
  const config = {
    module: {
      strictExportPresence: true,
      rules: [
        options.babel.enabled && babel(options),
        options.eslint.enabled && eslint(options),
        css(options),
        images(),
        svg(options),
      ],
    },
  }

  return config
}

export default loaders
