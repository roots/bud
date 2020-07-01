import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const loaders = {
  babel: require.resolve('babel-loader'),
  css: require.resolve('css-loader'),
  eslint: require.resolve('eslint-loader'),
  postcss: require.resolve('postcss-loader'),
}

/**
 * Babel loader
 */
const babel = ({src}) => ({
  test: /\.(js|jsx)$/,
  include: src,
  exclude: /node_modules/,
  loader: loaders.babel,
})

/**
 * Eslint loader
 */
const eslint = ({src, eslint}) => ({
  enforce: 'pre',
  test: /\.(js|js)$/,
  include: src,
  exclude: /node_modules/,
  loader: loaders.eslint,
  options: {
    configFile: eslint.configFile,
    formatter: 'codeframe',
    failOnError: true,
  },
})

const post = configFile => ({
  loader: loaders.postcss,
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
  test: /\.s?css$/,
  include: src,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: loaders.css, options: {url: false}},
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
const webpackModules = options => {
  const config = {
    module: {
      strictExportPresence: true,
      rules: [],
    },
  }

  options.babel.enabled &&
    config.module.rules.push(babel(options))

  options.eslint.enabled &&
    config.module.rules.push(eslint(options))

  config.module.rules.push(css(options))
  config.module.rules.push(images())
  config.module.rules.push(svg(options))

  return config
}

export default webpackModules
