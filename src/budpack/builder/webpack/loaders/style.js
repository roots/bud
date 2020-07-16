import MiniCssExtractPlugin from 'mini-css-extract-plugin'

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
 * loader test regex patterns
 *
 * @typedef {object} pattern
 * @prop {RegExp} sass
 * @prop {RegExp} sassModule
 * @prop {RegExp} css
 * @prop {cssModule} cssModule
 */
const pattern = {
  sass: /\.scss$/,
  sassModule: /\.module\.(scss|sass)$/,
  css: /\.css$/,
  cssModule: /\.module\.css$/,
}

/**
 * Style loaders
 *
 * @typedef {object} loader
 * @prop {string} css
 * @prop {string} postCss
 * @prop {string} resolveUrl
 * @prop {string} sass
 * @prop {string} style
 */
const loader = {
  css: require.resolve('css-loader'),
  postCss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  sass: require.resolve('sass-loader'),
  style: require.resolve('style-loader'),
}

/**
 * CSS modules
 * @typedef {function} cssModule
 * @return {object}
 */
const cssModule = function (bud) {
  return {
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
          sourceMap: bud.features.map,
          debug: true,
        },
      },
      ...this.maybePostCss(bud),
    ],
  }
}

/**
 * Sass modules
 * @typedef {function} sassModule
 * @return {object}
 */
const sassModule = function (bud) {
  return {
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
          sourceMap: bud.features.map,
          debug: true,
        },
      },
      ...maybePostCss(bud),
      {
        loader: loader.sass,
        options: {
          sourceMap: true,
          implementation,
        },
      },
    ],
  }
}

/**
 * Css
 * @typedef {function} css
 * @return {object}
 */
const css = function (bud) {
  return {
    test: pattern.css,
    use: [
      MiniCssExtractPlugin.loader,
      loader.css,
      {
        loader: loader.resolveUrl,
        options: {
          sourceMap: bud.features.map,
          debug: true,
        },
      },
      ...this.maybePostCss(bud),
    ],
  }
}

/**
 * Sass
 * @typedef {function} sass
 * @return {object}
 */
const sass = function (bud) {
  return {
    test: pattern.sass,
    use: [
      MiniCssExtractPlugin.loader,
      loader.css,
      {
        loader: loader.resolveUrl,
        options: {
          engine: 'postcss',
          sourceMap: bud.features.map,
          debug: true,
        },
      },
      ...this.maybePostCss(bud),
      {
        loader: loader.sass,
        options: {
          sourceMap: true,
          implementation,
        },
      },
    ],
  }
}

/**
 * Maybe PostCSS
 * @typedef {function} maybePostCss
 * @return {object}
 */
const maybePostCss = function (bud) {
  return bud.features.postCss
    ? [
        {
          loader: loader.postCss,
          options: {
            ident: 'postcss',
            parser: 'postcss-scss',
            plugins: [...bud.options.postCss.plugins],
          },
        },
      ]
    : []
}

/**
 * Compile
 */
const compile = function () {
  return [
    this.sass(this.bud),
    this.css(this.bud),
    this.sassModule(this.bud),
    this.cssModule(this.bud),
  ]
}

/**
 * Style loaders
 */
const style = bud => ({
  bud,
  maybePostCss,
  sass,
  css,
  sassModule,
  cssModule,
  compile,
})

export {style}
