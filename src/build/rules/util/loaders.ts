import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { bud } from '../../../bud'

/**
 * Style loaders
 *
 * @type {object} loaders
 */
const loaders = {
  babel: require.resolve('babel-loader'),
  css: require.resolve('css-loader'),
  file: require.resolve('file-loader'),
  eslint: require.resolve('eslint-loader'),
  miniCss: hot => ({
    loader: MiniCssExtractPlugin.loader,
  }),
  postCss: require.resolve('postcss-loader'),
  resolveUrl: require.resolve('resolve-url-loader'),
  scss: require.resolve('sass-loader'),
  style: require.resolve('style-loader'),
  svgr: require.resolve('@svgr/webpack'),
  url: require.resolve('url-loader'),
  ts: require.resolve('ts-loader'),
}

export {loaders}
