import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const loaderModules = {
  babel: require.resolve('babel-loader'),
  css: require.resolve('css-loader'),
  eslint: require.resolve('eslint-loader'),
  file: require.resolve('file-loader'),
  postcss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
}

/**
 * Babel loader
 */
const babel = ({src, babel}) => ({
  test: /\.js$/,
  include: src,
  exclude: /node_modules/,
  loader: loaderModules.babel,
  options: babel.options,
})

/**
 * Eslint loader
 */
const eslint = ({src, eslint}) => ({
  enforce: 'pre',
  test: /\.js$/,
  include: src,
  exclude: /node_modules/,
  loader: loaderModules.eslint,
  options: {
    configFile: eslint.config,
    formatter: 'codeframe',
    failOnError: true,
  },
})

/**
 * CSS Loader
 */
const css = ({src, postCss}, features) => ({
  test: /\.s[ac]ss$/i,
  include: src,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: loaderModules.css,
      options: {url: false},
    },
    ...(features.postCss && postCss.options
      ? [
          {
            loader: loaderModules.postcss,
            options: {
              ...postCss.options,
              importLoaders: 1,
            },
          },
        ]
      : []),
    {
      loader: loaderModules.resolveUrl,
      options: {
        engine: 'postcss',
        sourceMap: false,
        debug: true,
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    },
  ],
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
const loaders = ({features, options, configs}) => ({
  module: {
    strictExportPresence: true,
    rules: [
      ...(features.eslint && configs.eslint
        ? [eslint(configs)]
        : []),
      ...(features.babel && options.babel
        ? [babel(options)]
        : []),
      css(options, features),
      images(),
      svg(options),
    ],
  },
})

export {loaders}
