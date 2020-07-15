import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const patterns = {
  stylesheet: /\.(scss|sass|css)$/,
  stylesheetModule: /\.module\.(scss|sass|css)$/,
}

const loaders = {
  css: require.resolve('css-loader'),
  postCss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  sass: require.resolve('sass-loader'),
  style: require.resolve('style-loader'),
}

const moduleLoader = (features, postCss) => ({
  test: patterns.stylesheetModule,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: loaders.css,
      options: {
        modules: true,
        onlyLocals: false,
      },
    },
    ...(!features.postCss
      ? []
      : [
          {
            loader: loaders.postCss,
            options: {
              ...postCss,
              ident: 'postcss',
              importLoaders: 1,
            },
          },
        ]),
    {
      loader: loaders.sass,
      options: {
        sourceMap: true,
      },
    },
  ],
})

const globalLoader = (features, postCss) => ({
  use: [
    MiniCssExtractPlugin.loader,
    {loader: loaders.css},
    ...(!features.postCss
      ? []
      : [
          {
            loader: loaders.postCss,
            options: {
              ...postCss,
              ident: 'postcss',
              importLoaders: 1,
            },
          },
        ]),
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

const style = ({postCss}, features, paths) => ({
  test: patterns.stylesheet,
  include: paths.src,
  oneOf: [
    moduleLoader(features, postCss),
    globalLoader(features, postCss),
  ],
})

export {style}
