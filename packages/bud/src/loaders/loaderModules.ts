import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const loaderModules = {
  babel: require.resolve('babel-loader'),
  css: require.resolve('css-loader'),
  file: require.resolve('file-loader'),
  minicss: MiniCssExtractPlugin.loader,
  postcss: require.resolve('postcss-loader'),
  raw: require.resolve('raw-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  style: require.resolve('style-loader'),
  url: require.resolve('url-loader'),
}

export {loaderModules as default}
