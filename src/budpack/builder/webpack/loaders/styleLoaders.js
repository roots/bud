import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const patterns = {
  stylesheet: /\.(scss|sass|css)$/,
  stylesheetModule: /\.module\.(scss|sass|css)$/,
}

const loaders = {
  css: require.resolve('css-loader'),
  postcss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  sass: require.resolve('sass-loader'),
  style: require.resolve('style-loader'),
}

const stylesheet = ({postCss}, features, src) => ({
  test: patterns.stylesheet,
  include: src,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: loaders.style},
    {loader: loaders.css},
    ...(features.postCss
      ? [
          {
            loader: loaders.postcss,
            options: {
              ...postCss,
              ident: 'postcss',
              importLoaders: 1,
            },
          },
        ]
      : []),
    {
      loader: loaders.resolveUrl,
      options: {
        engine: 'postcss',
        sourceMap: features.map,
        debug: true,
      },
    },
    {
      loader: loaders.sass,
      options: {
        sourceMap: true,
      },
    },
  ],
})

const stylesheetModule = (features, postCss, src) => ({
  test: patterns.stylesheetModule,
  include: src,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: loaders.css},
    ...(!features.postCss
      ? []
      : [
          {
            loader: loaders.postcss,
            options: {
              ...postCss,
              importLoaders: 3,
            },
          },
        ]),
  ],
})

/**
 * Style loaders
 */
const styleLoaders = (options, features, paths) => [
  stylesheet(features, options.postCss, paths.src),
  stylesheetModule(features, options.postCss, paths.src),
]

export {styleLoaders}
