import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  ['babel-loader']: require.resolve('babel-loader'),
  ['css-loader']: require.resolve('css-loader'),
  ['file-loader']: require.resolve('file-loader'),
  ['minicss-loader']: MiniCssExtractPlugin.loader,
  ['postcss-loader']: require.resolve('postcss-loader'),
  ['raw-loader']: require.resolve('raw-loader'),
  ['resolve-url-loader']: require.resolve('resolve-url-loader'),
  ['style-loader']: require.resolve('style-loader'),
  ['url-loader']: require.resolve('url-loader'),
}
