import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const pattern = {
  sass: /\.(scss|sass)$/,
  sassModule: /\.module\.(scss|sass)$/,
  css: /\.css$/,
  cssModule: /\.module\.css$/,
}

const loader = {
  css: require.resolve('css-loader'),
  postCss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  sass: require.resolve('sass-loader'),
  style: require.resolve('style-loader'),
}

const cssModule = (features, postCss) => ({
  test: pattern.cssModule,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: loader.css,
      options: {
        modules: true,
        onlyLocals: false,
      },
    },
    {
      loader: loader.resolveUrl,
      options: {
        engine: 'postcss',
        sourceMap: features.map,
        debug: true,
      },
    },
    ...(!features.postCss
      ? []
      : [
          {
            loader: loader.postCss,
            options: {
              ...postCss,
              ident: 'postcss',
            },
          },
        ]),
  ],
})

const sassModule = (features) => ({
  test: pattern.sassModule,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: loader.css,
      options: {
        modules: true,
        onlyLocals: false,
      },
    },
    {
      loader: loader.resolveUrl,
      options: {
        engine: 'postcss',
        sourceMap: features.map,
        debug: true,
      },
    },
    {
      loader: loader.sass,
      options: {
        sourceMap: true,
      },
    },
  ],
})

const css = (features, postCss) => ({
  test: pattern.css,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: loader.css,
    },
    {
      loader: loader.resolveUrl,
      options: {
        sourceMap: features.sourceMap,
        debug: true,
      },
    },
    ...(!features.postCss
      ? []
      : [
          {
            loader: loader.postCss,
            options: {
              ...postCss,
              ident: 'postcss',
            },
          },
        ]),
  ],
})

const sass = (features, postCss) => ({
  test: pattern.sass,
  use: [
    MiniCssExtractPlugin.loader,
    {loader: loader.css},
    ...(!features.postCss
      ? []
      : [
          {
            loader: loader.postCss,
            options: {
              ...postCss,
              ident: 'postcss',
            },
          },
        ]),
    {
      loader: loader.sass,
      options: {
        sourceMap: true,
      },
    },
  ],
})

const style = ({postCss}, features) => [
  sass(features, postCss),
  css(features, postCss),
  sassModule(features, postCss),
  cssModule(features, postCss),
]

export {style}
