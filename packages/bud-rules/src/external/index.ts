import {loader as minicssLoader} from 'mini-css-extract-plugin'

export default {
  ['babel-loader']: require.resolve('babel-loader'),
  ['css-loader']: require.resolve('css-loader'),
  ['file-loader']: require.resolve('file-loader'),
  ['minicss-loader']: minicssLoader,
  ['postcss-loader']: require.resolve('postcss-loader'),
  ['raw']: require.resolve('raw-loader'),
  ['resolve-url-loader']: require.resolve('resolve-url-loader'),
  ['style']: require.resolve('style-loader'),
  ['url']: require.resolve('url-loader'),
}
