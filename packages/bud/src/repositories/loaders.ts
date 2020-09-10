import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const loaders = {
  name: 'loaders',
  register: {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    miniCss: MiniCssExtractPlugin.loader,
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    style: require.resolve('style-loader'),
    url: require.resolve('url-loader'),
  },
}

export {loaders as default}
