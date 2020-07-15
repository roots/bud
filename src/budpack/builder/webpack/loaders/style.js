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

/**
 * resolve whether to use dart-sass or node-sass
 */
const implementation = (() => {
  try {
    return require.resolve('sass') ? require('sass') : require('node-sass')
  } catch {
    return require('node-sass')
  }
})()

/**
 * CSS modules
 */
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

/**
 * Sass modules
 */
const sassModule = (features, postCss) => ({
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
        implementation,
      },
    },
  ],
})

/**
 * Css
 */
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

/**
 * Sass
 */
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
        implementation,
      },
    },
  ],
})

/**
 * Style loaders
 */
const style = ({postCss}, features) => [
  sass(features, postCss),
  css(features, postCss),
  sassModule(features, postCss),
  cssModule(features, postCss),
]

export {style}
