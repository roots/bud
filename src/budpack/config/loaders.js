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
        babel(options),
        css(options),
        images(),
        svg(options),
      ],
    },
  }

  options.eslint.enabled
    && config.module.rules.unshift(eslint(options))

  return config
}

export default loaders
